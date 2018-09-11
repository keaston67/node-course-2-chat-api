var expect = require('expect');

//  load in file need ./ in same directory
var {generateMessage} = require('./message');

describe('generateMessage', () => {
it('should create the correct message object', () => {
        var from = 'Mr Ed';
        var text = "Hey Wilburrrrr!!!";
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});