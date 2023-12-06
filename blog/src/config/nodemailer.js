const nodemailer = require('nodemailer');
// Tạo transporter cho dịch vụ email
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'huelt201@gmail.com', // Email gửi
    pass: 'HuelucthiA@'  // Mật khẩu email gửi
  }
});

module.exports = transporter;

