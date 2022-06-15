const { check } = require("express-validator");
const userModel = require("./database/models/User");
const {validationResult} = require('express-validator');

exports.registerUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      NEW USER (no results retrieved)
  //        a. Hash password
  //        b. Create user
  //        c. Redirect to login page
  //      EXISTING USER (match retrieved)
  //        a. Redirect user to login page with error message.

  // 3. If INVALID, redirect to register page with errors
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, username, password1 } = req.body;
  
    //TODO: Test validation
    res.redirect('/login');
  } else {
  
    req.flash('error_msg', "Error");
    res.redirect('/signup');
  }
};