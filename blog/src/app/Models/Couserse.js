const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const Course = new Schema({
    courseid: String,
    name: { type: String, maxLength:255 },
    description: { type: String, maxLength:600  },
    image: { type: String },
    category: { type: String },
    gia: { type: Number },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
});

Course.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', Course); 