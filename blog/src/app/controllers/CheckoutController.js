const Course = require('../Models/Couserse');
const Order = require('../Models/Order');
const {mongooseToObject} = require('../../util/mongoose');

class CheckoutController {
 
    index(req, res){
        res.render('checkout',{authenticated: req.session.authenticated || false});
    }

    // Xử lý yêu cầu đặt hàng POST
    async placeOrder(req, res, next) {
        // console.log("abcd");

        try {
            // Lấy thông tin đặt hàng từ request body
            const {
                fullName,
                email,
                phone,
                province,
                district,
                street,
                specificAddress,                
            } = req.body;

            // Tạo một đối tượng Order để lưu vào MongoDB
            const newOrder = new Order({
                fullName,
                email,
                phone,
                province,
                district,
                street,
                specificAddress,
            });

            // Lưu đơn hàng vào MongoDB
            // await newOrder.save();
            const savedOrder = await newOrder.save();
            const orderData = {
                fullName: savedOrder.fullName,
                email: savedOrder.email,
                phone: savedOrder.phone,
                // Thêm các thông tin đơn hàng khác 
            };
            return res.status(201).json(orderData);

            res.redirect('/checkorder', {authenticated: req.session.authenticated || false}); // Chuyển hướng đến trang kiểm tra đơn hàng
            

            // Trong phương thức placeOrder
            req.session.authenticated = true; // Đặt giá trị authenticated trong session
            res.redirect('/checkorder'); // Chuyển hướng đến trang kiểm tra đơn hàng

        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi đặt hàng' });
        }
    }     

}

module.exports = new CheckoutController();

