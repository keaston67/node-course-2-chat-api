var socket = io();
    
    // listener functions
    // ES6 arrow functions are now supported in all major browsers
    // socket.on('connect', () => {
    //         console.log('connected to server');
    // });
    //     socket.on('disconnect', () => {
    //     console.log('Disconnected from server');
    // });

    //  use normal functions per Andrews video
    socket.on('connect', function() {
            console.log('connected to server');
    });

    socket.on('disconnect', function() {
            console.log('Disconnected from server');
    });

    // listen for new message
// listen for new message
socket.on('newMessage', function(message) {
    console.log('New message from server ', message);
    // var li = jQuery('<li></li>')
    // li.text(`${message.from}: ${message.text}`);
    $('#messages').append(`<li>${message.from}: ${message.text}</li>`);
    $('[placeholder]').val(" ");
});

    // listen for new location message
    socket.on('newLocationMessage', function(message) {
         // Andrews method
         var li = jQuery('<li></li>');
         // target = blank opens a new tab rather than existing and kick out of chatroom
         var a = jQuery('<a target="_blank">My Current Location</a>');

         li.text(`${message.from}: `);
         a.attr('href', message.url);
         li.append(a);
         jQuery('#messages').append(li);
     });

// jquery form action
jQuery('#message-form').on('submit', function (e) {
    // override default page refresh
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {   
    });
});

// geolocation
var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (){
        alert('Unable to fetch location');
    })
});


// ---- OLD CODE -------

//     socket.on('newUser', function() {
//         console.log('connected to server');
// });

    
    // socket.on('newEmail', function(email) {
    //     console.log('New email', email);
    // });

    //  as soon as connect will emit this event
        // socket.emit('createEmail', {
        //     to: 'jen@example.com',
        //     text: 'Hey, this is Kim'
        // });

 // emit a new message, removed when broadcast added in server.js
        // socket.emit('createMessage', {
        //     from: 'Wilbur',
        //     text: 'What the!, a talking horse!!!!'
        //     });


// Set up a standard (client) event emitter - previously emitting in console
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'I did it my way!'
// }, function (data) {
// // Add 3rd argument - a callback for acknowledgement on client
//     console.log('Got it ', data);
// });
