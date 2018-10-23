window.onload = setTimeout(function(){
  var socket = io.connect('ws://sim:8088');
  //var socket = new io.Socket();
  //socket.connect('ws://sim:8088');
    socket.on('onUpdate', function (data) {
    //Update(data);
    var update = new CustomEvent(
      "update",
      {
        detail: data,
        bubbles: true,
        cancelable: false
      }
    );
    window.dispatchEvent(update);
  });


  function connectToEchoServer() {
    update = new WebSocket('ws://sim:1234');
    update.onopen = function(evt) { onOpenEcho(evt) };
    update.onclose = function(evt) { onCloseEcho(evt) };
    update.onmessage = function(evt) { onMessageEcho(evt) };
    update.onerror = function(evt) { onErrorEcho(evt) };
  }

  function onOpenEcho(evt) {
    console.log("CONNECTED to echo server");
    //doSend("WebSocket rocks");
    console.log('You can test your Gauges by sending the desired JSON to the echo-server by executing the following (or a similar) command at the console:')
    console.log('update.send(JSON.stringify({"AIRSPEED INDICATED":(Math.random()*250)+30, "SELECTED DME":2, "NAV DME:2":Math.floor(Math.random()*2000)/10}))')
  }

  function onCloseEcho(evt) {
    console.log("DISCONNECTED from echo server");
  }

  function onMessageEcho(evt) {
    var update = new CustomEvent(
      "update",
      {
        detail: JSON.parse(evt.data),
        bubbles: true,
        cancelable: false
      }
    );
    window.dispatchEvent(update);
  }
  connectToEchoServer();


  function connectToSimconnectServer() {
    Simconnect = new WebSocket('ws://sim:8088');
    Simconnect.onopen = function(evt) { onOpen(evt) };
    Simconnect.onclose = function(evt) { onClose(evt) };
    Simconnect.onmessage = function(evt) { onMessage(evt) };
    Simconnect.onerror = function(evt) { onError(evt) };
  }

  function onOpen(evt) {
    console.log("CONNECTED to Simconnect");
    //doSend("WebSocket rocks");
    console.log('You can test your Gauges by sending the desired JSON to the echo-server by executing the following (or a similar) command at the console:')
    console.log('update.send(JSON.stringify({"AIRSPEED INDICATED":(Math.random()*250)+30, "SELECTED DME":2, "NAV DME:2":Math.floor(Math.random()*2000)/10}))')
  }

  function onClose(evt) {
    console.log("DISCONNECTED from Simconnect");
  }

  function onMessage(evt) {
    var update = new CustomEvent(
      "update",
      {
        detail: JSON.parse(evt.data),
        bubbles: true,
        cancelable: false
      }
    );

    function onError(evt){}

    window.dispatchEvent(update);
  }
  connectToSimconnectServer();
}, 10);
