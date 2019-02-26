const mongoose = require("mongoose");

//schemas set a rigid structure that can't be changed or added to. This protects from people arbitrarily adding to an object
let personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
})

module.exports = mongoose.model('Person', personSchema);