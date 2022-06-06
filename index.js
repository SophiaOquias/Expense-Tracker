// init packages 
const express = require('express');
const exphbs = require('express-handlebars');
const app = new express();

// init server port
var server = app.listen(3000, function () {
    console.log("Listening at port 3000...");
});

// MONGOOSE stuff 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expenseTrackerDB',
{ useNewURLParser: true, useUnifiedTopology: true });

// Post initializations. 
const Post = require("./database/models/Post");
const path = require('path');

// Initialize data and static folder 
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // might change later
app.use(express.static(__dirname + "/public"));

/* using handlebars */
app.set('view engine', 'hbs');
app.engine("hbs", exphbs.engine({ extname: "hbs" }));

// INDEX STUFF
// TO CHANGE THIS LATER WITH HANDLEBARS
app.get('/', function(req, res) {
    // res.sendFile(__dirname + '\\' + 'public/html/index.html');
    res.render("index");
});

app.get('/new-entry', function(req, res) {
    // res.sendFile(__dirname + '\\' + 'public/html/newentry.html');
    res.render("new-entry");
});

// to add: app.post for confirming new entry