var moment = require('moment');

// Jan 1st 1970 00:00:10 am

// var date = new Date();
// // zero based month value 0-11, to get months would need to create an array
// console.log(date.getMonth());

// create new moment object = current point in time, call the format() method
// var date = moment();
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am padded hour e.g. 06:30am

new Date().getTime();
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));