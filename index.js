// init packages 
const express = require('express');
const exphbs = require('express-handlebars');
const app = new express();

// init server port
const port = 3000; 
var server = app.listen(port, function () {
    console.log("Listening at port " + port);
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


// ROUTES

// INDEX STUFF
// To do: edit goals and viewing entries 
app.get('/', function(req, res) {
    // res.sendFile(__dirname + '\\' + 'public/html/index.html');
    res.render("index");
});

// for some reason this needs to be async, not sure why tho but it works ¯\_(ツ)_/¯
app.get('/get-expenses', async(req, res) => {
    var expenses = await Post.find({}).lean(); // .lean() makes query in JSON format
    res.status(200).send(expenses);
});

// NEW ENTRY STUFF
app.get('/new-entry', function(req, res) {
    res.render("new-entry");
});

app.post('/add-expense', function(req, res) {
    var expense = {
        // entryType is the name attr, and entrytype is id attr in hbs file
        // for some reason if element is a selection, it needs name attribute instead of id
        entryType: req.body.entryType,
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        notes: req.body.notes,
        ORnumber: req.body.ORnumber
    }

    Post.create(expense);

    res.status(200).send(expense);
});

// to add: app.post for confirming new entry