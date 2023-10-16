const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    userid: String,
    id: String,
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Cart', Cart);
