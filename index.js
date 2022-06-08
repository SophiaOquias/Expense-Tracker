// init packages 
const express = require('express');
const exphbs = require('express-handlebars');
const app = new express();

// init server port
const port = 3000; 
var server = app.listen(port, function () {
    console.log("Listening at port " + port + "...");
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
app.use(express.static(__dirname + "/public")); // place all html, js, css for the pages here

// using handlebars 
app.set('view engine', 'hbs');
app.engine("hbs", exphbs.engine({ extname: "hbs" }));


// ROUTES

// INDEX STUFF (home page)
// TO DO: edit goals and viewing entries 
app.get('/', function(req, res) {
    // res.sendFile(__dirname + '\\' + 'public/html/index.html');
    res.render("index");
});

// for some reason this needs to be async, not entirely sure why tho but it works ¯\_(ツ)_/¯
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
        // if id is used to identify selection, the selection won't be detected in the req.body
        entryType: req.body.entryType,
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        notes: req.body.notes,
        ORnumber: req.body.ORnumber
    }

    // create document in db 
    Post.create(expense);

    // refer to public/scripts/newentry.js for all the AJAX stuff
    res.status(200).send(expense);
});

// VIEW EXPENSES STUFF
app.get('/view-expenses', function(req, res) {
    res.render("view-expenses");
});

app.get('/view-expenses/get-expenses-only', async(req, res) => {
    var expenses = await Post.find({entryType:"expense"}).lean();
    res.status(200).send(expenses);
});

// VIEW SAVINGS STUFF
app.get('/view-savings', function(req, res) {
    res.render("view-savings");
});

app.get('/view-savings/get-savings-only', async (req, res) => {
    var expenses = await Post.find({ entryType: "savings" }).lean();
    res.status(200).send(expenses);
});

// LOGIN STUFF
app.get('/login', function(req, res) {
    res.render("login", {layout: "login-layout"});
});

// VIEW ACCOUNT STUFF
app.get('/account', function(req, res) {
    res.render("view-account");
});