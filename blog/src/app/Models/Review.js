const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    courseId : String,
    userid : String,
    id: String,
    fullName: { type: String, maxLength:255 }, 
    message: { type: String, maxLength:600  },
    rating: { type: Number },
    createdAt: { type: Date, default: Date.now }, 

}, { timestamps: true });


module.exports = mongoose.model('Review', Review);
