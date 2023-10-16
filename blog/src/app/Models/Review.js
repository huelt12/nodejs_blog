const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    useid : String,
    rating: { type: Number, required: true },
    message: { type: String, required: true }
});


module.exports = mongoose.model('Review', Review);
