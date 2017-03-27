$(document).ready(function(){
	let socket = io.connect();
	let jsonstring = '{}';
	socket.on('chat', function (data) {
		Update(data);
	});

	// Nachricht senden
	function senden(event){
		jsonstring = $('#text').val();
		if (event !== undefined){
			if (event.type === 'mousemove'){
			let x = event.clientX-document.getElementById('content').offsetWidth/2;
			let y = event.clientY-document.getElementById('content').offsetWidth/2;
			jsonstring = '{"test":{"x":'+x+', "y":'+y+'}}';
			}
		}
		jsonstring = JSON.parse(jsonstring);
		socket.emit('chat', jsonstring);
	}

	function publish(object){
		socket.emit('chat', object);
	}

	$('#senden').click(senden);
	$('#content').mousemove(senden);
	
	$('#text').keypress(function (e) {
		if (e.which == 13) {
			senden();
		}
	});

});