
const simConnect = require('./build/Release/node-simconnect')
,   express = require('express')
,   app = express()
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
let myVars = [];
let json ={};

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

// Websocket

io.sockets.on('connection', function (socket) {
	// der Client ist verbunden
	socket.emit('simPanel', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
	// wenn ein Benutzer einen Text senden
	socket.on('simPanel', function (data) {
		// so wird dieser Text an alle anderen Benutzer gesendet
    console.log("\n-- received by socket: "+data+"\n");
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
    simConnect.setDataOnSimObject("BRAKE PARKING POSITION:1", "Position", 1);

    // Get the .air file name of the loaded aircraft. Then get the aircraft title.
    simConnect.requestSystemState("AircraftLoaded", function(obj) {
        var airFile = obj.string;

        simConnect.requestDataOnSimObject([["TITLE", null, 11, "Title"]], function(data) {
            console.log("Aircraft loaded: " + data[0] + " (" + airFile + ")");
          }, 0, SIMCONNECT_PERIOD_ONCE, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
    });


    // Subscribe to paused/unpaused event
    simConnect.subscribeToSystemEvent("Pause", (paused) => {
        if(paused)
            console.log("Sim paused");
        else
            console.log("Sim un-paused");
    });

    desiredVars.forEach(function(variable, i) {
      let minDelta = variable.epsilon ? variable.epsilon : 0.0;
      myVars.push([variable.name, variable.unitsname]);
      /*
      simConnect.requestDataOnSimObject([[variable.name, variable.unitsname, variable.type, minDelta]], function(data) {
        let myvariable = (variable.name).replace(/ /g, '_').replace(/:/, '_');
        io.emit('simPanel', '{ "' + myvariable + '": ' + data + ' }');
      }, 0, SIMCONNECT_PERIOD_VISUAL_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED );
      */
    })

    simConnect.requestDataOnSimObject(myVars, function(data) {
      let json = '{'
      data.forEach(function(data, i) {
        json += '"' + desiredVars[i].name + '": ' + data + ',';
      })
      json = json.substr(0,json.length-1);
      json += '}'
      console.log(JSON.parse(json));
      io.emit('simPanel', JSON.parse(json));
    }, 0, SIMCONNECT_PERIOD_VISUAL_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);

    /*
    simConnect.requestDataOnSimObject([
            ["GENERAL ENG THROTTLE LEVER POSITION:1","Percent over 100",1,1],
            ["GENERAL ENG THROTTLE LEVER POSITION:2","Percent over 100",5,1],
            ["TRAILING EDGE FLAPS LEFT ANGLE","degrees", 1, 1]
        ], function(data) {
            console.log("Engine state:  " + data[0] + "," + data[1] + ","  + data[2] + ","  + data[3]);
        }, 0, SIMCONNECT_PERIOD_SIM_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
        */

}
