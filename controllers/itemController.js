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
            people_id: "",
            item_name: "shoes",
            quantity: "1",
            item_status: 0,
            description: "size 7"
        };
        Item.create(result).then(function (doc) {
            People.findOneAndUpdate({ '_id': "" }, { $push: { "items": doc._id } }, { new: true }).then(function (doc) {
                res.json(doc);
            }).catch(function (err) {
                res.json(err);
            });
        }).catch(function (err) {
            res.json(err);
        });
    },
    findMyItemsIds:function(req,res){
        var itemIdArray = req.query.idArray;
        Item.find({
            '_id': { $in: itemIdArray}
        }).then(function (doc) {
            res.json(doc);
        }).catch(function (err) {
            res.json(err);
        });
    }
};