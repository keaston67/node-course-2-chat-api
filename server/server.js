const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

// add port environment variable for heroku to run
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public'); // old way
console.log(publicPath); // new way

var app = express();
// create a http server, takes function (req, res) but so similar to express can simply
// pass in app
var server = http.createServer(app);
// add this and now ready to accept new connections
var io = socketIO(server);

// serve a static resource / middleware
app.use(express.static(publicPath));

// register an event listener
io.on('connection', (socket) => {
    console.log('New user connected');

//  add event listener for disconnect from browser
socket.on('disconnect', () => {
    console.log('User was disconnected');
    });
});

// change app.listen to server.listen
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});






// route handler
// app.get('/', (req, res) => {
//     res.send('<p> Welcome to my chat app! </p>');
// });
