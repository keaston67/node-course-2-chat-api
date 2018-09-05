const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');

// add port environment variable for heroku to run
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public'); // old way
console.log(publicPath); // new way

var app = express();

// serve a static resource
app.use(express.static(publicPath));

// route handler
// app.get('/', (req, res) => {
//     res.send('<p> Welcome to my chat app! </p>');
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});