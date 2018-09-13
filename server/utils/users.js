[{
id: '/#1235126hksldlls',
name: 'Sebastian',
room: 'The Office Fans'
}]

//  4 methods:
// Add User(id, name, room)
// removerUser(id)
// getUser(id)
// getUserList(room)


class Users {
constructor () {
    this.users = []
    }
    addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
    }
    removeUser (id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser (id) {
       return this.users.filter((user) => user.id === id)[0];
    
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name );
        return namesArray;
    }
}

module.exports = {Users};

//   ES6 class 
//   create a new class

// class Person {
//     constructor (name, age) {
//       this.name = name;
//       this.age = age;
//     }
//     // class methods
//     getUserDescription () {
//         return `${this.name} is ${this.age}`;
//     }
// }
// //  create a new instance
// var me = new Person('Kim', 51);
// var description = me.getUserDescription();
// console.log(description)
// console.log('this name ', me.name, 'this age ', me.age );