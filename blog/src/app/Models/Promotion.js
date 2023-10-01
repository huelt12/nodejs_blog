const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Promotion = new Schema({
    name: { type: String, maxLength:255 },
    description: { type: String, maxLength:600  },
    image: { type: String },
    gia: { type: Number },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});
module.exports = mongoose.model('promotions', Promotion);