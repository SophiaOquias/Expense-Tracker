const router = require('express').Router();

// Post initializations. 
const Post = require("../database/models/Post");
const path = require('path');
const { ObjectId } = require('mongodb');

// ROUTES

// INDEX STUFF (home page)
// TO DO: edit goals and viewing entries 
router.get('/', async (req, res) => {
    var expenses = await Post.find({}).lean(); // .lean() makes query in JSON format 

    res.render("index", { entry: expenses });
});

// this gets the balance, total expense, and total income 
router.get('/get-total', async (req, res) => {
    var expenses = await Post.find({}).lean(); // .lean() makes query in JSON format
    res.status(200).send(expenses);
});

// NEW ENTRY STUFF
router.get('/new-entry', function (req, res) {
    res.render("new-entry", { layout: "no-new-entry" });
});

router.post('/add-expense', function (req, res) {
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
router.get('/view-expenses', async (req, res) => {
    var expense = await Post.find({ entryType: "expense" }).lean();
    res.render("view-expenses", { expense });
});

// VIEW SAVINGS STUFF
router.get('/view-savings', async (req, res) => {
    var expense = await Post.find({ entryType: "savings" }).lean();
    res.render("view-savings", { expense });
});

// LOGIN STUFF
router.get('/login', function (req, res) {
    res.render("login", { layout: "login-layout" });
});

// SIGNUP STUFF
router.get('/signup', function (req, res) {
    res.render("signup", { layout: "login-layout" })
})

// VIEW ACCOUNT STUFF
router.get('/account', function (req, res) {
    res.render("view-account", { layout: "no-new-entry" });
});

// VIEW ENTRY STUFF
/**
     * Each entry is embedded with its corresponding objectID in the database. 
     * Everytime an entry is clicked, it will lead to this url: /view/entry?id=<entryID here>.
     * req.query.id gets the id from the url and stores it to entryID and this ID is used to create
     * a query in the database for the document with that ObjectID.
     */
router.get('/view/entry', async (req, res) => {
    var entryID = req.query.id;
    const entry = await Post.findById(entryID).lean();
    res.render("view-entry", entry);
});

// delete entry 
router.get('/delete/entry', async (req, res) => {
    var entryID = req.query.id;
    await Post.deleteOne({ _id: entryID });
    res.redirect("/");
});

router.get('/edit/entry', async (req, res) => {
    var entryID = req.query.id;
    const entry = await Post.findById(entryID).lean();
    res.render("edit-entry", entry);
});

router.post('/edit/confirm', async (req, res) => {
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

    await Post.updateOne({ _id: ObjectId(entryID) }, { $set: newEdits })
});

router.get('/search', async (req, res) => {
    let expenses = await Post.find({
        "$or": [
            { entryType: { $regex: req.query.key } },
            { ORnumber: { $regex: req.query.key } },
            { date: { $regex: req.query.key } },
            { description: { $regex: req.query.key } },
            { category: { $regex: req.query.key } }
        ]
    }).lean();

    res.render("search", { expenses })
});

module.exports = router; 