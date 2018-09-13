const expect = require('expect');

// import users
const{Users} = require('./users');

describe('Users', () => {
var users;

//  seed data
beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'},
        {
        id: '2',
        name: 'Jen',
        room: 'React Course'},
        {
        id: '3',
        name: 'Julie',
        room: 'Node Course'},
    ]
});

    it('should add a new User', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Kim',
            room: 'The Office Fans'
        };
        var resUser =   users.addUser(user.id, user.name, user.room);
        // 1st users refers to var above, 2nd = users array, arrays use to Equal
        expect(users.users).toEqual([user]);
    });
    it('should remove a user', () => {
        var id = '1';
        var user = users.removeUser(id);
        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var id = '4';
        var user = users.removeUser(id);
        expect(user).toNotExist(id);
        expect(users.users.length).toBe(3);
    });
    it('should find a user', () => {
        var id = '3'
        var userList = users.getUser(id);
        expect(userList.id).toBe(id)
    });
    it('should not find a user', () => {
        var id = '4'
        var userList = users.getUser(id);
        expect(userList).toNotExist()
    });
    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });
    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });
});