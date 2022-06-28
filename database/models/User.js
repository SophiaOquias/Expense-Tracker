const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    budgetGoal: Number,
    savingsGoal: Number
});

const userModel = mongoose.model('User', UserSchema);

//Save user given a validated object
exports.create = function(obj, next) {
    const user = new userModel(obj);

    user.save(function(err, user) {
        next(err, user);
    })
};

//Retrieve user based on ID
exports.getById = function(id,next) {
    userModel.findById(id, function(err,user){
        next(err, user);
    })
};

//Retrieve only one user based on query
exports.getOne = function(query, next){
    userModel.findOne(query, function(err, user) {
        next(err, user);
    });
};