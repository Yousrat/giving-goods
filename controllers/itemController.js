var Item = require("../models/Item");
var People = require("../models/People");

module.exports = {
    allItem: function (req, res) {
        Item.find({}).populate({ path: 'people_id', populate: { path: 'shelter_id' } }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    myItem: function (req, res) {
        Item.find({}).populate({
            path: 'people_id',
            match: { _id: "" }
        }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    findItem: function (req, res) {
        let id = req.params.id;
        Item.findById(id).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    addItem: function (req, res) {
        var result = {
            people_id: req.body.peopleId,
            item_name: req.body.itemName,
            quantity: req.body.quantity,
            item_status: req.body.itemStatus,
            description: req.body.description
        };
        Item.create(result).then(function (doc) {
            People.findOneAndUpdate({ '_id': req.body.peopleId }, { $push: { "items": doc._id } }, { new: true }).then(function (doc) {
                res.json(doc);
            }).catch(function (err) {
                res.json(err);
            });
        }).catch(function (err) {
            res.json(err);
        });
    },
    updateItem: function (req, res) {
        var updatedItemInfo = {
            item_name: req.body.itemName,
            quantity: req.body.quantity,
            item_status: req.body.itemStatus,
            description: req.body.description
        };
        Item.update({ _id: req.body.itemId }, updatedItemInfo).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    },
    findMyItemsIds: function (req, res) {
        var itemIdArray = req.query.idArray;
        Item.find({
            '_id': { $in: itemIdArray }
        }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    }
};