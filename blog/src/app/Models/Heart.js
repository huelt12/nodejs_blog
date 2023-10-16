const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Heart = new Schema({
    userid: String,
    id: String, 
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Heart', Heart);
 