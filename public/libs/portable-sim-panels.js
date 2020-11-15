
let Simconnect;

window.onload = setTimeout(function() {
  const SimconnectPort = location.port;
  function connectToSimconnectServer() {
    Simconnect = new WebSocket('ws://' + window.location.hostname + ':' + SimconnectPort + '/fsuipc');
    Simconnect.onopen = function(evt) {
      onOpen(evt) ;
    };
    Simconnect.onclose = function(evt) {
      onClose(evt);
    };
    Simconnect.onmessage = function(evt) {
      onMessage(evt);
    };
    Simconnect.onerror = function(evt) {
      onError(evt);
    };
  }

  function onOpen(evt) {
    console.log('CONNECTED to Websocket @ : ' + SimconnectPort);
    //Simconnect.send("WebSimXMLCode:(>K:SOUND_TOGGLE)");
  }

  function onClose(evt) {
    console.log("DISCONNECTED from Websocket");
    setTimeout(function () {
      connectToSimconnectServer();
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

  connectToSimconnectServer();
}, 10);


function SetFsuipc(key, value) {
  Simconnect.send("{\""+key+"\":\""+value+"\"}");
}