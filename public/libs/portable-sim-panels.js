let Websocket;

window.onload = setTimeout(function() {
  const WebsocketPort = location.port;
 
  function connectToWebsocketServer() {
    Websocket = new WebSocket('ws://' + window.location.hostname + ':' + WebsocketPort + '/fsuipc');
    Websocket.onopen = function(evt) {
      onOpen(evt) ;
    };
    Websocket.onclose = function(evt) {
      onClose(evt);
    };
    Websocket.onmessage = function(evt) {
      onMessage(evt);
    };
    Websocket.onerror = function(evt) {
      onError(evt);
    };
  }

  function onOpen(evt) {
    console.log('CONNECTED to Websocket @ : ' + WebsocketPort);
    Websocket.send("{\"myMessage\":\"Sending to server\"}");
  }

  function onClose(evt) {
    console.log("DISCONNECTED from Websocket");
    setTimeout(function () {
      connectToWebsocketServer();
    }, 1000);
  }

  function onMessage(evt) {
    const update = new CustomEvent(
      "update",
      {
        detail: JSON.parse(evt.data),
        bubbles: true,
        cancelable: false
      }
    );
    window.dispatchEvent(update);
  }
  function onError(evt){}

  connectToWebsocketServer();
}, 10);

function setFsuipcValue(messageJson) {
  message = typeof messageJson == "object" ? JSON.stringify(messageJson) : message;
  Websocket.send(message);
}