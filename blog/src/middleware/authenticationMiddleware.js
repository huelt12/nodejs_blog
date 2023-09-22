// const express = require('express');
// const bodyParser = require('body-parser');
// const { check, validationResult } = require('express-validator');
// const app = express();

// // Sử dụng middleware Body Parser để xử lý dữ liệu đầu vào từ biểu mẫu
// app.use(bodyParser.urlencoded({ extended: false }));

// // Middleware kiểm tra dữ liệu đầu vào từ biểu mẫu đặt hàng
// const validateOrderInput = [
//     check('fullName')
//         .notEmpty()
//         .withMessage('Họ không được để trống'),
//     check('email')
//         .isEmail()
//         .withMessage('Email không hợp lệ'),
//     check('phone')
//         .notEmpty()
//         .withMessage('Số điện thoại không được để trống'),
// ];

// // Middleware xử lý lỗi sau khi kiểm tra
// const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         const errorMessages = errors.array().map((error) => error.msg);
//         return res.status(400).json({ errors: errorMessages });
//     }
//     next();
// };
