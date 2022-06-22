const { check } = require("express-validator");
const userModel = require("../database/models/User");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {email, username, password} = req.body;

    userModel.getOne({email: email}, (err, result) => {
      if (result) {
        console.log(result);

        req.flash('error_msg', 'User already exists. Please login');
        res.redirect('/login');
      } else {
        const saltRounds = 10;
        
        //Hash password
        bcrypt.hash(password, saltRounds, (err, hashed) => {
          const newUser = {
            email,
            username,
            password: hashed
          };

          userModel.create(newUser, (err, user) => {
            if (err) {
              req.flash('error_msg', 'Could not create user. Please try again.');
              res.redirect('signup');
            } else {
              req.flash('success_msg', 'You are now registered!');
              res.redirect('/login');
            }
          })
        })

      }
    })
  } else {
    //error
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    console.log(messages.join(' '));
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
    
          // next block of code goes here
          res.redirect('/');
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
