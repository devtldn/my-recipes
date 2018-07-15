const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: String,
    
    date: {
        type: Date,
        default: Date.now
    },
    
    body: String
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;