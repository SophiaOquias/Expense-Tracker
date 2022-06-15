const {body} = require('express-validator');

const registerValidation = [
    //Email check
    body('email').not().isEmpty().withMessage("Please fill out the email section")
    .isEmail().withMessage("Please provide a valid email address."),

    //Username check
    body('username').not().isEmpty().withMessage("Please provide a username"),

    //Password check
    body('password1').not().isEmpty().withMessage("Please provide a password"),

    body('password2').not().isEmpty().withMessage("Please provide a password")
    .custom((value, {req})=> {
        if (value !== req.body.password) {
            throw new Error("Passwords must match");
        }
        return true;
    })

];

module.exports = {registerValidation};