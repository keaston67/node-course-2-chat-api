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

    //  as soon as connect will emit this event
        // socket.emit('createEmail', {
        //     to: 'jen@example.com',
        //     text: 'Hey, this is Kim'
        // });

    // emit a new message
        socket.emit('createMessage', {
            from: 'Wilbur',
            text: 'What the!, a talking horse!!!!'
            });
    });

        socket.on('disconnect', function() {
        console.log('Disconnected from server');
    });

    // listen for new message
    socket.on('newMessage', function(message) {
        console.log('New message from server ', message);
    });

    
    // socket.on('newEmail', function(email) {
    //     console.log('New email', email);
    // });
