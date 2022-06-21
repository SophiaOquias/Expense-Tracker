const router = require('express').Router();

// importing controller
const controller = require("../controllers/controller");

// ROUTES

// INDEX STUFF (home page)
// TO DO: edit goals and viewing entries 
router.get('/', controller.getAllEntries);

// this gets the balance, total expense, and total income 
router.get('/get-total', controller.getTotal);

// NEW ENTRY STUFF
router.get('/new-entry', controller.newEntry);

router.post('/add-expense', controller.addExpense);

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