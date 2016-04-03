var app = require('express')();
var http = require('http').Server(app);
var io  = require('socket.io')(http);  

// dashboard
app.get('/', function(req, res){
  res.sendFile('index.html' , { root : __dirname});
});

var macbook_socket = undefined;

io.on('connection', function(socket) {  
  console.log('new connection');
  socket.emit('helo', {msg: 'welcome'});
  socket.on('accelerometer', function(data) {
    console.log('accel');
    console.log(data);
  });

  socket.on('user', function(data) {
    console.log(data);
      if (data.type == "client") {
          //saving socket
          macbook_socket = socket;
      }
  });

  socket.on("next", function(data) {
      console.log("received next");
      if (democlientsocket != undefined) {
          democlientsocket.emit("next", {});
      }           
  });

  socket.on("prev", function(data) {
      console.log("received prev");
      if (democlientsocket != undefined) {
          democlientsocket.emit("prev", {});
      }
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  socket.on('rotation', function(data){
    console.log('rotation: ' + data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});