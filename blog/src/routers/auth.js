const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController'); // Đường dẫn tới tệp điều khiển
const { isAuth } = require('../middleware/authMiddleware'); // Đường dẫn đến tệp authMiddleware
const transporter = require('../config/nodemailer'); // Đường dẫn đúng đến tệp nodemailer.js

router.get('/register', (req, res) => {
  res.render('auth/register', { layout: false }); // Không sử dụng layout
});

router.post('/register', authController.register); // Sử dụng hàm xử lý logic từ tệp điều khiển


router.get('/login', (req, res) => {
  res.render('auth/login', { layout: 'login' });
});

router.post('/login', authController.login); // Sử dụng hàm xử lý logic từ tệp điều khiển


// router.get('/', (req, res) => {
//   // Kiểm tra nếu người dùng đã đăng nhập
//   const isLoggedIn = req.session.isLoggedIn || false;

//   // Render trang dashboard và truyền biến isLoggedIn vào template
//   res.render('/header', { isLoggedIn });
// });

router.get('/', isAuth, (req, res) => {
  // Trang home chỉ được truy cập nếu đã đăng nhập
  const isLoggedIn = req.session.isLoggedIn || false;
  res.render('header', { isLoggedIn });
});


module.exports = router;




