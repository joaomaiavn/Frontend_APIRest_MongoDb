const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
    name: String,
    salary: Number,
    approved: Boolean,
    email: String,
    phone: Number,
});

module.exports = Person;