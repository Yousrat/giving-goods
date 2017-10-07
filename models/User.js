var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    role: String,
    privilege: {
        type: Number,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    location: String,
    phone: String,
    address: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;
