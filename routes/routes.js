const router = require('express').Router();
const {registerValidation, loginValidation, editAccountValidation} = require('../public/scripts/validator.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth.js');

// importing controller
const controller = require("../controllers/controller");
const userController = require('../controllers/userController');

// ROUTES
router.get('/', isPrivate, controller.getAllEntries);
router.get('/edit-budget', isPrivate, userController.getGoals);
router.get('/edit-budget/confirm', isPrivate, userController.confirmEditBudget); 
router.get('/edit-savings', isPrivate, userController.getGoals);
router.get('/edit-savings/confirm', isPrivate, userController.confirmEditSavings);
router.get('/get-total', controller.getTotal);
router.get('/get-goals', isPrivate, userController.getGoals);
router.get('/new-entry', controller.newEntry);
router.post('/add-expense', controller.addExpense);
router.get('/view-expenses', controller.getExpenses);
router.get('/view-savings', controller.getSavings);
router.get('/login', isPublic, controller.login);
router.get('/signup', isPublic, controller.signup);
router.post('/signup', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);
router.get('/logout', isPrivate, userController.logoutUser);
router.get('/account', userController.viewAccount);
router.get('/account/edit', userController.editAccount)
router.post('/account/edit/confirm', editAccountValidation, userController.confirmEditAccount);
router.get('/account/delete', isPrivate, userController.deleteAccount);
router.get('/view/entry', controller.viewEntry);
router.get('/delete/entry', controller.deleteEntry);
router.get('/edit/entry', controller.getEditEntry);
router.post('/edit/confirm', controller.confirmEditEntry);
router.get('/search', controller.search);
router.get('/about', controller.about);

module.exports = router; 