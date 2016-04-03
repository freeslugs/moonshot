var app = require('express')();
var http = require('http').Server(app);
var io  = require('socket.io')(http);  

// dashboard
app.get('/', function(req, res){
  res.sendFile('index.html' , { root : __dirname});
});

demoSocket = null;

io.on('connection', function(socket) {  
  console.log('new connection');
  
  // socket.emit('hello', {msg: 'welcome'});
  socket.on('accelerometer', function(data) {
    console.log('accel');
    console.log(data);
  });

  socket.on('set demo', function(data) {
    demoSocket = socket.id;
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  socket.on('rotation', function(data){
    console.log('rotation: ' + data);
    socket.broadcast.to(demoSocket).emit('rotation', data);
  });

  socket.on('disconnect', function(){
    if(socket.id == demoSocket) {
      demoSocket = null;  
    }
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});