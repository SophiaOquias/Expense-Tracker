// init packages 
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const router = require("./routes/routes")

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

app.use('/', router); 

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
}));