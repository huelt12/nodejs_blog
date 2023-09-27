const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa Schema cho đơn hàng
const Order = new Schema({
    userid: String,
    fullName: String,
    email: String,
    phone: String,
    province: String,
    district: String,
    street: String,
    specificAddress: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // liên kết đơn hàng với sản phẩm (courses)
    totalAmount: Number,
    
}, { timestamps: true });
// Tạo model cho đơn hàng
module.exports = mongoose.model('Order', Order);




