const router = require('express').Router();
const {registerValidation, loginValidation} = require('../public/scripts/validator.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth.js');

// importing controller
const controller = require("../controllers/controller");
const userController = require('../controllers/userController');

// ROUTES
router.get('/', isPrivate, controller.getAllEntries);
router.get('/get-total', controller.getTotal);
router.get('/new-entry', controller.newEntry);
router.post('/add-expense', controller.addExpense);
router.get('/view-expenses', controller.getExpenses);
router.get('/view-savings', controller.getSavings);
router.get('/login', isPublic, controller.login);
router.get('/signup', isPublic, controller.signup);
router.post('/signup', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);
router.get('/logout', isPrivate, userController.logoutUser);
router.get('/account', controller.viewAccount);
router.get('/account/edit', controller.editAccount)
router.delete('/account/delete', isPrivate, controller.deleteAccount);
router.get('/view/entry', controller.viewEntry);
router.get('/delete/entry', controller.deleteEntry);
router.get('/edit/entry', controller.getEditEntry);
router.post('/edit/confirm', controller.confirmEditEntry);
router.get('/search', controller.search);

module.exports = router; 