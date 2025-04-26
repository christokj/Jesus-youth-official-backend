const mongoose = require("mongoose");

const StudentModelSchema = new mongoose.Schema({
    name: String,
    age: Number,
    unit: String,
    address: String,
    mobile: Number,
    place: String,
    maritalStatus: String,
    dob: String,
    parish: String
});

module.exports = mongoose.model("StudentModel", StudentModelSchema);