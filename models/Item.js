var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    people_id: {
        type: Schema.Types.ObjectId,
        ref: 'People'
    },
    item_name: {
        type: String,
        required: true
    },
    quantity: {
        type: String
    },
    item_status: {
        type: Number,
    },
    description: String
});

var Item = mongoose.model("Item", itemSchema);

module.exports = Item;
