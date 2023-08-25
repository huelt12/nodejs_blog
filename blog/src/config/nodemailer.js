const nodemailer = require('nodemailer');
// Tạo một transporter cho dịch vụ email
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Hoặc sử dụng host và port cho dịch vụ email tùy chọn
  auth: {
    user: 'huelt201@gmail.com', // Email gửi
    pass: 'HuelucthiA@'  // Mật khẩu email gửi
  }
});

module.exports = transporter;

