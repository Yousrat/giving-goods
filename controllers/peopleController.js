var People = require("./../models/People");
var User = require("./../models/User");
var Item = require("./../models/Item");

module.exports = {
    allPeople: function (req, res) {
        People.find({}).populate({
            path: 'shelter_id'
        }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    myPeople: function (req, res) {
        People.find({}).populate({
            path: 'shelter_id',
            match: { _id: "594fe4be4c080c0a9e4adfed" }
        }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    addPeople: function (req, res) {
        var result = {
            person_first_name: "",
            person_last_name: "",
            shelter_id: "",
            person_code: "",
            age_group: "12-20",
            gender: "",
            notes: ""
        };
        People.create(result).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    peopleByLocation: function (req, res) {
        var shelterIdArray = [];
        if (req.query.location === "All") {
            People.find({}).populate({
                path: 'shelter_id'
            }).then(function (doc) {
                res.json(doc);
            }).catch(function (err) {
                res.json(err);
            });
        } else {
            User.find({ location: req.query.location }).then(function (doc) {
                for (var i = 0; i < doc.length; i++) {
                    shelterIdArray.push(doc[i]._id);
                }
                People.find({
                    'shelter_id': { $in: shelterIdArray }
                }).populate({
                    path: 'shelter_id'
                }).then(function (doc) {
                    res.json(doc);
                }).catch(function (err) {
                    res.json(err);
                });
            }).catch(function (err) {
                res.json(err);
            });
        }
    },
    peopleByItems: function (req, res) {
        if (req.query.item === "") {
            People.find({}).populate({
                path: 'shelter_id'
            }).then(function (doc) {
                res.json(doc);
            }).catch(function (err) {
                res.json(err);
            });
        } else {
            Item.distinct('people_id', {
                'item_name': new RegExp(req.query.item, "i")
            }).then(function (peopleIdArray) {
                People.find({
                    '_id': { $in: peopleIdArray }
                }).populate({
                    path: 'shelter_id'
                }).then(function (doc) {
                    res.json(doc);
                }).catch(function (err) {
                    res.json(err);
                });
            }).catch(function (err) {
                res.json(err);
            });
        }
    }
};