const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Heart = new Schema({
    userid: { type: String, required: true },
    bookid: String,
    name: { type: String, maxLength:255 },
    description: { type: String, maxLength:600  },
    image: { type: String },
    gia: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Heart', Heart);
