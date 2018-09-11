const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

// add generateLocationMessage
const{generateMessage, generateLocationMessage} = require('./utils/message');
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

// socket.emit from admin - welcome to the chat app, add 
socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
// socket.broadcast.emit from admin saying new user joined
socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined')); 

// listen for message from user and broadcast, add callback for acknowledge
socket.on('createMessage', (message, callback) => {
        console.log('createMessage ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
});

//  listen for location message and emit
socket.on('createLocationMessage', (coords) => {
// io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
});

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

// emit an event
// socket.emit('newEmail', {
//     from: 'mike@example.com',
//     text: 'Hey, whassup!',
//     createdAt: 123
// });    

// socket.on('createEmail', (newEmail) => {
//     console.log('createEmail', newEmail);
// });

// send a message to all users // removed when broadcast added above
// socket.emit('newMessage', {
//     from: 'mrED',
//     text: 'Hey Wilbur!!!',
//     createdAt: 456
// });    