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
router.get('/get-total', isPrivate, controller.getTotal);
router.get('/get-goals', isPrivate, userController.getGoals);
router.get('/new-entry', isPrivate, controller.newEntry);
router.post('/add-expense', isPrivate, controller.addExpense);
router.get('/view-expenses', isPrivate, controller.getExpenses);
router.get('/view-savings', isPrivate, controller.getSavings);
router.get('/login', isPublic, controller.login);
router.get('/signup', isPublic, controller.signup);
router.post('/signup', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);
router.get('/logout', isPrivate, userController.logoutUser);
router.get('/account', isPrivate, userController.viewAccount);
router.get('/account/edit', isPrivate, userController.editAccount)
router.post('/account/edit/confirm', isPrivate, editAccountValidation, userController.confirmEditAccount);
router.get('/account/delete', isPrivate, userController.deleteAccount);
router.get('/view/entry', isPrivate, controller.viewEntry);
router.get('/delete/entry', isPrivate, controller.deleteEntry);
router.get('/edit/entry', isPrivate, controller.getEditEntry);
router.post('/edit/confirm', isPrivate, controller.confirmEditEntry);
router.get('/search', isPrivate, controller.search);
router.get('/about', controller.about);

module.exports = router; 