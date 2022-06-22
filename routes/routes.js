const router = require('express').Router();

// importing controller
const controller = require("../controllers/controller");

// ROUTES
router.get('/', controller.getAllEntries);
router.get('/get-total', controller.getTotal);
router.get('/new-entry', controller.newEntry);
router.post('/add-expense', controller.addExpense);
router.get('/view-expenses', controller.getExpenses);
router.get('/view-savings', controller.getSavings);
router.get('/login', controller.login);
router.get('/signup', controller.signup);
router.get('/account', controller.viewAccount);
router.get('/view/entry', controller.viewEntry);
router.get('/delete/entry', controller.deleteEntry);
router.get('/edit/entry', controller.getEditEntry);
router.post('/edit/confirm', controller.confirmEditEntry);
router.get('/search', controller.search);

module.exports = router; 