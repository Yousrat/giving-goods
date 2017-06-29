var People = require("../models/People");

module.exports = {
    allPeople: function (req, res) {
        People.find({}).populate({
            path : 'shelter_id' 
        }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    myPeople: function (req, res) {
        People.find({}).populate({
            path : 'shelter_id',
            match: { _id: "594fe4be4c080c0a9e4adfed" }
        }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    addPeople: function (req, res) {
        var result = {
            person_first_name: "sia",
            person_last_name: "ram",
            shelter_id: "594fe4ca4d12660aa8729ac7",
            person_code: "005",
            age_group: "12-20",
            gender: "female",
            notes: "ewrfewrf ef34f34"
        };
        People.create(result).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    }
};