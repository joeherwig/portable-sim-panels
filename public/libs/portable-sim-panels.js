window.onload = setTimeout(function(){
  var socket = new io.Socket();
  socket.connect('ws://sim:8088');
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
}, 10);
