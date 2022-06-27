const { check } = require("express-validator");
const userModel = require("../database/models/User");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
  const errors = validationResult(req);

  console.log(errors);

  if (errors.isEmpty()) {
    const {username, email, password} = req.body;

    userModel.getOne({email: email}, (err, result) => {
      if (result) {
        console.log(result);
        //if email already exists: throw error
        req.flash('error_msg', 'User already exists. Please login');
        res.redirect('/login');
      } else {
        //create user
        const saltRouds = 10;
        bcrypt.hash(password, saltRounds, (err, hashed) => {
          const newUser = {
            username,
            email,
            password: hashed
          };

          userModel.create(newUser, (err, user) => {
            if (err) {
              req.flash('error_msg', 'Could not create user. Please try again');
              res.redirect('/register');
            }
            else {
              req.flash('success_msg', 'You are now registered! Please login');
              res.redirect('/login');
            }
          });
        });
      }
    })
  } else {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/signup');
  }
}

exports.loginUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {username, password} = req.body;

    // Next items go here... Same as before, this will be replaced.
    userModel.getOne({ username: username }, (err, User) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (User) {
          // User found!
    
          bcrypt.compare(password, user.password, (err, result) => {
            //passwords match (result == true)
            if (result) {
              //update session object once matched
              req.session.user = user._id;
              req.session.name = user.name;

              console.log(req.session);

              res.redirect('/');
            }
            else { //passwords don't match
              req.flash('error_msg', 'Incorrect password. Please try again');
              res.redirect('/login');
            }
          });
        } else {
          // No user found
          req.flash('error_msg', 'No registered user with that username. Please register.');
          res.redirect('/signup');
        }
      }
    });
  } else {
      const messages = errors.array().map((item) => item.msg);

      req.flash('error_msg', messages.join(' '));
      res.redirect('/login');
  }
};
