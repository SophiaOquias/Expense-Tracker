const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    entryType: String,
    date: String,
    category: String,
    description: String,
    amount: Number,
    notes: String,
    ORnumber: String
});

// idk what the stuff below do 
const postModel = mongoose.model('Post', PostSchema);

exports.getAllEntries = function(next) {
    postModel.find({}).lean().exec(function(err, result) {
        if(err) throw err; 
        next(result);
    })
}

exports.createEntry = function(doc) {
    postModel.create(doc);
}