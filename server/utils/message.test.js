var expect = require('expect');

//  load in file need ./ in same directory
var {generateMessage, generateLocationMessage} = require('./message');
//var {generateLocation} = 

describe('generateMessage', () => {
it('should create the correct message object', () => {
        var from = 'Mr Ed';
        var text = "Hey Wilburrrrr!!!";
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocation', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = -36;
        var longitude = 174;
        var location = generateLocationMessage(from, latitude, longitude);
        expect(location.url).toBe('https://www.google.com/maps?q=-36,174');
        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({from});
    });
});