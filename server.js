
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

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

app.post('/',function(req,res,next){
	io.sockets.emit('simPanel', req.body);
	console.log(req.body);
	res.end("published");
} );

io.sockets.on('connection', function (socket) {
	socket.emit('simPanel', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
	socket.on('simPanel', function (data) {
		socket.emit('simPanel', data);
	});
});

function setupDataRequests(name) {
    var vs = 0;
    var gnd = 1;
    simConnect.requestSystemState("AircraftLoaded", function(obj) {
      fetchAircraftConst();
    });

    simConnect.subscribeToSystemEvent("Pause", (paused) => {
        if(paused)
            console.log("Sim paused");
        else
            console.log("Sim un-paused");
    });

    simConnect.subscribeToSystemEvent("AircraftLoaded", (aircraft) => {
      fetchAircraftConst();
    });

    function fetchAircraftConst(){
      simConnect.requestDataOnSimObject([["TITLE", null, 11],["ATC ID", null, 11],["ATC TYPE", null, 11],["NUMBER OF ENGINES", "Number"],["ENGINE TYPE","ENUM"]], function(data) {
        aircraft = JSON.parse('{"aircraft": "'+(data['TITLE']+'').replace(/"/g, '-')+'", "ATC ID": "'+data['ATC ID']+'", "atc type": "'+data['ATC TYPE']+'", "number of engines": '+data['NUMBER OF ENGINES']+', "engine type": '+data['ENGINE TYPE']+'}');
        aircraftVars(aircraft)
          .then(currentAircraftVars => subscribeAircraftVars(currentAircraftVars))
          .catch(() => {});
        }, 0, SIMCONNECT_PERIOD_ONCE, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
    };

    function subscribeAircraftVars(myVars) {
      simConnect.requestDataOnSimObject(myVars, function(data) {
        let json = '{'
        for(var key in data) {
          json += '"' + key + '" : ' + data[key] + ','
        }
        json = json.substr(0,json.length-1);
        json += '}'
        io.emit('simPanel', JSON.parse(json));
      }, 0, SIMCONNECT_PERIOD_VISUAL_FRAME, SIMCONNECT_DATA_REQUEST_FLAG_CHANGED);
    }
}
