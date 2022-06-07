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
const Post = mongoose.model('Post', PostSchema);

module.exports = Post; 