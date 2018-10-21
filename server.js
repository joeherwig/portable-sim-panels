
const
    express = require('express')
,   app = express()
,   aircraftVars = require('./public/libs/getAircraftVars')
,   server = require('http').createServer(app)
,   io = require('socket.io').listen(server)
,   bodyParser = require("body-parser");

let myVars = []
,   json ={};

server.listen(8080);
console.log('Der Server läuft nun unter http://127.0.0.1:8080' + '/');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});
