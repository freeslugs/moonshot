var socket = require('socket.io-client')('http://moonshot.ngrok.com');

socket.on('connect', function(){
  socket.emit('set demo');
});

socket.on('rotation', function (data) {
  var SerialPort = require("serialport").SerialPort;
  var portName = '/dev/tty.usbmodem1411';

  var port = new SerialPort(portName, {
    baudRate: 9600,
    parser: serialport.parsers.readline("\n")
  });

  serialPort.on('open', function () {
    serialPort.write('ls\n', function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  });

  serialPort.on('data', function () {
    serialPort.write(data);
    console.log(data);
  });
});
