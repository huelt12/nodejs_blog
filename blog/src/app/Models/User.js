const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    email: String,
    password: String  // Mật khẩu đã mã hóa sẽ được lưu ở đây
  });

module.exports = mongoose.model('User', User);

