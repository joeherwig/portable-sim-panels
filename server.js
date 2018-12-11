
const
    express = require('express')
,   app = express()
,   aircraftVars = require('./public/libs/getAircraftVars')
,   server = require('http').createServer(app)
,   io = require('socket.io').listen(server)
,   bodyParser = require("body-parser")
,   WebSocket = require('ws')
,   wss = new WebSocket.Server({port: 1234});

let myVars = []
,   json ={}
,   CLIENTS=[];


const webserverPort = 80
server.listen(webserverPort);
console.log('Der Server läuft nun unter http://127.0.0.1:' +webserverPort+ '/');
app.use(express.static(__dirname + '/public'));
//app.use(express.directory(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	//res.sendfile(__dirname + '/public/index.html');
});

wss.on('connection', function connection(ws) {
    console.log('Verbindung von Client auf :1234');
    CLIENTS.push(ws);
    ws.on('message', function incoming(data) {
      console.log(data)
      console.log(CLIENTS.length)
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
       });
   });
});
