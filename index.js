var express = require('express');
var app = express();

//Start the server, listening on port 4000.
var server = app.listen(4000, () => { 
    console.log("Listening to requests on port 4000...");
})

// Bind socket.io to our express server.
// IO is a library that enables real-time, bidirectional and 
// event-based communication between the browser and the server
var io = require('socket.io')(server); 

// Send index.html page on GET /
app.use(express.static('public')); 

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;

// Connect serial port to port COM3. Because my Arduino Board is 
// connected on port COM3. 
// See yours on Arduino IDE -> Tools -> Port
// const port = new SerialPort('COM3'); 
const port = new SerialPort('/dev/tty.usbmodem1411401');

//Read the line only when new line comes.
const parser = port.pipe(new Readline({delimiter: '\r\n'})); 

parser.on('data', (temp) => { 
    // Read data
    console.log(temp);
    var today = new Date();

    io.sockets.emit('temp', {
        // emit the data i.e. {date, time, temp} to all the connected clients.
        // date: today.getMonth() + "-" + today.getDate() + "-" + today.getFullYear(), 
        date: today.toDateString(),
        time: (today.getHours()) + ":" + (today.getMinutes()) + ":" + (today.getSeconds()) , 
        temp: temp
    }); 
});

io.on('connection', (socket) => {
    //show a log as a new client connects.
    console.log("Someone connected."); 
});