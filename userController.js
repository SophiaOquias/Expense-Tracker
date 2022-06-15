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

exports.loginUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      EXISTING USER (match retrieved)
  //        a. Check if password matches hashed password in database
  //        b. If MATCH, save info to session and redirect to home
  //        c. If NOT equal, redirect to login page with error
  //      UNREGISTERED USER (no results retrieved)
  //        a. Redirect to login page with error message

  // 3. If INVALID, redirect to login page with errors
  res.redirect('/');
};

exports.logoutUser = (req, res) => {
  // Destroy the session and redirect to login page
  res.redirect('/login');
};