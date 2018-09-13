var socket = io();
    
function scrollToBottom () {
    //   Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight'); 
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

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
            // console.log('connected to server');
      var params = jQuery.deparam(window.location.search);
    //   set up emitter for join event - listener in server.js
      socket.emit('join', params, function(err) {
        if(err) {
            // if err send alert and send back to root / login page
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
      });
    });

    socket.on('disconnect', function() {
            console.log('Disconnected from server');
    });

// listen for user updates
socket.on('updateUserList', function(users) {
console.log('Users list', users);
var ol = jQuery('<ol></ol>');
users.forEach(function (user) {
ol.append(jQuery('<li></li>').text(user));
    });
// render list to sidebar using .html as want to completely replace not add to
jQuery('#users').html(ol);
});

// listen for new message  // // = commented out  // commented out for muctache
socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    // add Mustache template
    var template = jQuery('#message-template').html();
    // pass in mustache template and all properties will be able to render
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    
    // // console.log('New message from server ', message);
    
    // // var li = jQuery('<li></li>')
    // // li.text(`${message.from}: ${message.text}`);
    // $('#messages').append(`<li>${message.from} ${formattedTime} : ${message.text}</li>`);
    // // My code here clears the message text field
    // //$('[placeholder]').val(" ");
});

    // listen for new location message
    socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    // add Mustache template
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();

        //  // Andrews method
        //  var formattedTime = moment(message.createdAt).format('h:mm a')
        //  var li = jQuery('<li></li>');
        //  // target = blank opens a new tab rather than existing and kick out of chatroom
        //  var a = jQuery('<a target="_blank">My Current Location</a>');

        //  li.text(`${message.from} ${formattedTime} : `);
        //  a.attr('href', message.url);
        //  li.append(a);
        //  jQuery('#messages').append(li);
     });

var messageTextBox = jQuery('[name=message]');

// jquery form action
jQuery('#message-form').on('submit', function (e) {
    // override default page refresh
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery(messageTextBox).val()
        // acknowledgement callback
    }, function() {   
        jQuery(messageTextBox).val('')
    }); 
});

// geolocation
var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        // console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (){
        locationButton.removeAttr('disabled').text('Send location');
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
