var User = require("../models/User");

module.exports = {
    allUsers: function (req, res) {
        User.find({}).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    addUser: function (req, res) {
        var result = {
            role: "shelter",
            privilege: 2,
            emailId: "shelter1",
            password: "shelter1",
            name: "shelter1",
            location: "san diego",
            address: "xxxx ddddd"
        };
        User.create(result).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    getMyInfo: function (req, res) {
        if (req.user) {
            let userId = req.user._id;
            User.findById(userId).then(function (doc) {
                res.json(doc);
            }).catch(function (err) {
                res.json(err);
            });
        }else{
            res.json(false);
        }
    },
    updateMyInfo: function (req, res) {
        if (req.user) {
            let userId = req.user._id;
            User.update({ _id: userId }, req.body)
            .then(function (doc) {
                res.json(doc);
            }).catch(function (err) {
                res.json(err);
            });
        }
    },
};