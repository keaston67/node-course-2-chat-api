const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const{generateMessage, generateLocationMessage} = require('./utils/message');
const{isRealString} = require('./utils/validation');
const{Users} = require('./utils/users');

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
var users = new Users();

// serve a static resource / middleware
app.use(express.static(publicPath));

// register an event listener
io.on('connection', (socket) => {
    console.log('New user connected');

// listen for join event, add callback for acknowledge
// socket.io join method, special method for joining rooms
socket.on('join', (params, callback) => {
if(isRealString(!params.name)|| !isRealString(params.room)) {
    callback('Name and room name are required');
    };

socket.join(params.room);
// remove user from any previous rooms
users.removeUser(socket.id);
users.addUser(socket.id, params.name, params.room);

io.to(params.room).emit('updateUserList', users.getUserList(params.room));
// socket.io leave method, special method for leaving rooms
// socket.leave('The Office Fans');

// targeting methods
// io.emit = targets / emits to all
// socket.broadcast.emit = to all connected to socket server except current user e.g. new user joined group
// socket.emit = targets one specific user  e.g. welcome to the chat app

//  targeting methods insode a specific room
// io.to('The Office Fans').emit = targets / emits to all in the room 'The Office Fans'
// socket.broadcast.to('The Office Fans').emit = to all connected to the room 'The Office Fans' except current user
// socket.emit = targets one specific user  e.g. welcome to the chat app - no change, still use to target a specific user
// socket.emit from admin - welcome to the chat app, add - emits to only one user
socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

// socket.broadcast.emit from admin saying new user joined
socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); 
    callback();          
});

// socket.io join method, special method for joining rooms
// socket.join(params.room);

// listen for message from user and broadcast, add callback for acknowledge
socket.on('createMessage', (message, callback) => {
        console.log('createMessage ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
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
    var user = users.removeUser(socket.id);
    if (user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin',` ${user.name} has left. `));
    }
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