// init packages 
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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
const { ObjectId } = require('mongodb');

// Initialize data and static folder 
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // might change later
app.use(express.static(__dirname + "/public")); // place all html, js, css for the pages here

// using handlebars 
app.set('view engine', 'hbs');
app.engine("hbs", exphbs.engine({ 
    extname: "hbs", 
    helpers: require(__dirname + '/public/hbs-helpers/helpers.js')
}));

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
    res.render("new-entry", {layout: "no-new-entry"});
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

// SIGNUP STUFF
app.get('/signup', function(req, res) {
    res.render("signup", {layout: "login-layout"})
})

//SESSION STUFF
/*
    * secret - signs session ID; should be a random string
    * store  - where sessions get stored
    * resave - when false: only saves the session when a value is modified
    * saveUninitialized: forces a new but unmodified session to be saved to the store
    * cookie: settings for current session cookie
*/
app.use(session({
    secret: 'l1v3Jesus',
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/expenseTrackerDB'}),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24 * 7}
}))

// VIEW ACCOUNT STUFF
app.get('/account', function(req, res) {
    res.render("view-account", {layout: "no-new-entry"});
});

// VIEW ENTRY STUFF
/**
     * Each entry is embedded with its corresponding objectID in the database. 
     * Everytime an entry is clicked, it will lead to this url: /view/entry?id=<entryID here>.
     * req.query.id gets the id from the url and stores it to entryID and this ID is used to create
     * a query in the database for the document with that ObjectID.
     */
app.get('/view/entry', async(req, res) => {
    var entryID = req.query.id;
    const entry = await Post.findById(entryID).lean(); 
    res.render("view-entry", entry);
});

// delete entry 
app.get('/delete/entry', async (req, res) => {
    var entryID = req.query.id; 
    await Post.deleteOne({_id: entryID});
    res.redirect("/");
});

app.get('/edit/entry', async(req, res) => {
    var entryID = req.query.id; 
    const entry = await Post.findById(entryID).lean();
    res.render("edit-entry", entry);
});

app.post('/edit/confirm', async(req, res) => {
    var entryID = req.body.id;
    var newEdits = {
        entryType: req.body.entryType,
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        notes: req.body.notes,
        ORnumber: req.body.ORnumber
    }

    await Post.updateOne({_id: ObjectId(entryID)}, {$set: newEdits})
});

app.get('/search', async (req, res) => {
    let expenses = await Post.find({
        "$or": [
            { entryType: { $regex: req.query.key } },
            { ORnumber: { $regex: req.query.key } },
            { date: { $regex: req.query.key } },
            { description: { $regex: req.query.key } },
            { category: { $regex: req.query.key } }
        ]
    }).lean();

    res.render("search", {expenses})
});
// TO DO: edit entry