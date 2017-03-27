
window.onload = setTimeout(function(){
  var socket = io.connect();
  socket.on('chat', function (data) {
    Update(data);
  });
}, 50);


