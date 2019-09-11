const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestemp: true
});

module.exports = mongoose.model('Note', NoteSchema);