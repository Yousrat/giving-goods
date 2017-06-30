var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var peopleSchema = new Schema({
    person_first_name: {
        type: String,
        required: true
    },
    person_last_name: {
        type: String,
        required: true
    },
    shelter_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    person_code: {
        type: String
    },
    age_group: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Items"
    }]
});

var People = mongoose.model("People", peopleSchema);

module.exports = People;