const postModel = require("../database/models/Post");
const path = require('path');
const { ObjectId } = require('mongodb');

exports.getAllEntries = function (req, res) {
    postModel.getAllEntries(function (entries) {
        res.render("index", { entry: entries });
    });
}

exports.getTotal = function (req, res) {
    postModel.getAllEntries(function (entries) {
        res.status(200).send(entries);
    });
}

exports.newEntry = function (req, res) {
    res.render("new-entry", { layout: "no-new-entry" });
}

exports.addExpense = function (req, res) {
    var expense = {
        // entryType is the name attr, and entrytype is id attr in hbs file
        // for some reason if element is a selection, it needs name attribute instead of id
        // if id is used to identify selection, the selection won't be detected in the req.body
        entryType: req.body.entryType,
        date: req.body.date,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        notes: req.body.notes,
        ORnumber: req.body.ORnumber
    }

    postModel.createEntry(expense); 
}