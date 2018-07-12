const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ChickenSchema = new Schema({
    Image: {
        type: String,
        required: true
    },

    Dish: {
        type: String,
        required: true
    },

    Summary: {
        type: String,
        required: true
    },

    Link: {
        type: String,
        required: true,
        unique: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Chicken = mongoose.model("Chicken", ChickenSchema);

module.exports = Chicken;