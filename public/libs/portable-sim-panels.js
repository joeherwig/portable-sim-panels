window.onload = setTimeout(function(){
  var socket = io.connect();
  socket.on('simPanel', function (data) {
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
}, 10);
