
const simConnect = require('./build/Release/node-simconnect')
,   express = require('express')
,   app = express()
,   aircraftVars = require('./public/libs/getAircraftVars')
,   server = require('http').createServer(app)
,   io = require('socket.io').listen(server)
,   bodyParser = require("body-parser");

// From SimConnect.h:
const SIMCONNECT_PERIOD_NEVER = 0;
const SIMCONNECT_PERIOD_ONCE = 1;
const SIMCONNECT_PERIOD_VISUAL_FRAME = 2;
const SIMCONNECT_PERIOD_SIM_FRAME = 3;
const SIMCONNECT_PERIOD_SECOND = 4;
const SIMCONNECT_DATA_REQUEST_FLAG_CHANGED = 1;
const SIMCONNECT_DATA_REQUEST_FLAG_TAGGED = 2;

var desiredVars = require('./desiredVars.json');
let myVars = []
,   json ={};

connectToSim();

// Open connection
function connectToSim() {
    console.log("Trying to connect...")
    var success = simConnect.open("MyAppName", function(name, version) {
        console.log("\n-----------------------------------------------\nConnected to: " + name + "\nSimConnect version: " + version + "\n-----------------------------------------------");
        setupDataRequests(name);
    }, () => {
        console.log("Quit.... :(");
        connectToSim();
    }, (exception) => {
        console.log("SimConnect exception: " + exception.name + " (" + exception.dwException + ", " + exception.dwSendID + ", " + exception.dwIndex + ", " + exception.cbData + ")");
    }, (error) => {
        // Happens for example when connection with SimConnect is lost unexpectedly. The connection must be re-opened.
        // Look up error in ntstatus.h for crash details
        console.log("SimConnect error: " + error);
        connectToSim();
    });

    if(!success) {
        setTimeout(() => {
            connectToSim();
        }, 5000);
    }
}
server.listen(8080);
console.log('Der Server läuft nun unter http://127.0.0.1:8080' + '/');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// wenn der Pfad / aufgerufen wird
app.get('/', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/public/index.html');
});

app.post('/',function(req,res,next){
	// console.log(req.body);
	io.sockets.emit('simPanel', req.body);
	console.log(req.body);
	res.end("published");
} );

io.sockets.on('connection', function (socket) {
	// der Client ist verbunden
	socket.emit('simPanel', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
	// wenn ein Benutzer einen Text senden
	socket.on('simPanel', function (data) {
		// so wird dieser Text an alle anderen Benutzer gesendet
    //console.log("\n-- received by socket: "+data+"\n");
		socket.emit('simPanel', data);
	});
});

function receivedData(variableName, value) {
  //console.log('\n' + variableName+ ': ' + value);
}

function setupDataRequests(name) {
    var vs = 0;
    var gnd = 1;

    // Set the aircraft's parking brake on
    //simConnect.setDataOnSimObject("BRAKE PARKING POSITION:1", "Position", 0);

    // Get the .air file name of the loaded aircraft. Then get the aircraft title.
    simConnect.requestSystemState("AircraftLoaded", function(obj) {
      fetchAircraftConst();
    });

    // Subscribe to paused/unpaused event
    simConnect.subscribeToSystemEvent("Pause", (paused) => {
        if(paused)
            console.log("Sim paused");
        else
            console.log("Sim un-paused");
    });

    simConnect.subscribeToSystemEvent("AircraftLoaded", (aircraft) => {
      fetchAircraftConst();
    });

    desiredVars.forEach(function(variable, i) {
      let minDelta = variable.epsilon ? variable.epsilon : 0.0;
      myVars.push([variable.name, variable.unitsname]);
    })

    subscribeAircraftVars(myVars);

    function fetchAircraftConst(){
      simConnect.requestDataOnSimObject([["TITLE", null, 11],["ATC ID", null, 11],["ATC TYPE", null, 11],["NUMBER OF ENGINES", "Number"],["ENGINE TYPE","ENUM"]], function(data) {
        aircraft = JSON.parse('{"aircraft": "'+(data[0]+'').replace(/"/g, '-')+'", "ATC ID": "'+data[1]+'", "atc type": "'+data[2]+'", "number of engines": '+data[3]+', "engine type": '+data[4]+'}');
        aircraftVars(aircraft)
          .then(currentAircraftVars => subscribeAircraftVars(currentAircraftVars))
          .catch(() => {});
        }, 0, SIMCONNECT_PERIOD_ONCE, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
    };

    function subscribeAircraftVars(myVars) {
      console.log('\n subscribing to: \n');
      console.log(myVars);
      simConnect.requestDataOnSimObject(myVars, function(data) {
        let json = '{'
        data.forEach(function(data, i) {
          json += '"' + desiredVars[i].name + '": ' + data + ',';
        })
        json = json.substr(0,json.length-1);
        json += '}'
        //console.log(JSON.parse(json));
        console.log();
        io.emit('simPanel', JSON.parse(json));
      }, 0, SIMCONNECT_PERIOD_VISUAL_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
    }
}
