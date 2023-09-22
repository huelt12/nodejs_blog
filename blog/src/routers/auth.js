const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const session = require('express-session');

const authController = require('../app/controllers/AuthController'); 
const { isAuth } = require('../middleware/authMiddleware'); // Đường dẫn đến authMiddleware
const transporter = require('../config/nodemailer'); // Đường dẫn đúng đến nodemailer.js


// tạo một chuỗi bí mật mã hóa dữ liệu liên quan đến phiên (session) của người dùng
const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};
const secretKey = generateRandomString(32); // Chuỗi có độ dài 32 ký tự
console.log(secretKey);

// Sử dụng session 
// router.use(session({ 
//   secret: secretKey,
//   resave: false,
//   saveUninitialized: false
// }));

 
// Đăng ký
router.get('/register', isAuth, (req, res) => {
  res.render('auth/register', { layout: 'register' }); 
});
router.post('/register', isAuth, authController.register);


router.get('/login',isAuth, (req, res) => {
  res.render('auth/login', { layout: 'login' });
});
router.post('/login',isAuth, authController.login); 


router.get('/logout', isAuth, authController.logout);


router.get('/', isAuth, (req, res) => {
  // Trang chính chỉ có thể truy cập nếu đã xác thực
  const isLoggedIn = req.session.authenticated || false;
  res.render('home', { authenticated: isLoggedIn }); // Truyền trạng thái xác thực vào mẫu
});
 



module.exports = router;




