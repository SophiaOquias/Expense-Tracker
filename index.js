// init packages 
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const router = require("./routes/routes")

const app = new express();

// init server port
//const port = 3000; 
var PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
    console.log("Listening at port " + PORT + "...");
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
    store: MongoStore.create({mongoUrl:'mongodb://localhost/expenseTrackerDB'}),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24 * 7}
}))

//FLASH
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', router); 

