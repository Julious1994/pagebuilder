var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var port = 3001;

require('./rest.api')(app);

mongoose.connect('mongodb://localhost/pagebuilder')
.then(()=> {
    console.log('Database connected');
})
.catch((error)=> {
    console.log('Error connecting to database');
});
 
app.get("/", (req, res) => {
 res.send("Hello World");
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});