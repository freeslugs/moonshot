  var socket = require('socket.io-client')('http://moonshot.ngrok.com');
  
  socket.on('connect', function(){
    socket.emit('set demo');
  });
  socket.on('rotation', function(data){
    console.log(data);
  });
  socket.on('disconnect', function(){

  });