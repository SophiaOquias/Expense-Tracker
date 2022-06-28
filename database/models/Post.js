const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    entryType: String,
    date: String,
    category: String,
    description: String,
    amount: Number,
    notes: String,
    ORnumber: String,
    user: String // user email
});

const postModel = mongoose.model('Post', PostSchema);

exports.getAllEntries = function(query, next) {
    postModel.find(query).lean().exec(function(err, result) {
        if(err) throw err; 
        next(result);
    });
}

exports.createEntry = function(doc) {
    postModel.create(doc);
}

exports.getById = function(id, next) {
    postModel.findById(id).lean().exec(function(err, result) {
        if(err) throw err; 
        next(result); 
    });
}

exports.deleteEntry = function(id, next) {
    postModel.deleteOne({ _id: id }).exec(function(err, result) {
        if(err) throw err; 
        next(result);
    });
}

exports.editEntry = function(id, edits) {
    postModel.updateOne(id, edits).exec(function(err) {
        if(err) throw err; 
    });
}

exports.deleteMany = function(id, next) {
    postModel.deleteMany({ user: id }).exec(function(err, result) {
        if(err) throw err; 
        next(result);
    });
}