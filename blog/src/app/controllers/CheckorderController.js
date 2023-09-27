const Order = require('../Models/Order');
const { mongooseToObject } = require('../../util/mongoose');

class CheckorderController {
    async showOrder(req, res) {
    try {
        // Lấy orderId từ session hoặc cookie
        const orderID = req.session.orderId;

        // Truy vấn cơ sở dữ liệu để lấy thông tin đơn hàng
        const order = await Order.findById(orderID).lean();
        // console.log("order");

        if (!order) {
            // Xử lý khi không tìm thấy đơn hàng
            return res.status(404).render('error', { error: 'Không tìm thấy đơn hàng' });
        }

        // Hiển thị view "checkorder" và truyền thông tin đơn hàng
        res.render('checkorder', { order });
    } catch (error) {
        console.error('Lỗi khi hiển thị đơn hàng:', error);
        res.status(500).render('error', { error: 'Đã xảy ra lỗi' });
    }
    }

    async getAllOrders(req, res, next) {
        const userId = req.session.user ? req.session.user.userId : ""; // Lấy userId từ session của người dùng đăng nhập
        console.log("userId get all order");
        console.log(userId);
        try {
            // Sử dụng Model để tìm các đơn hàng có userId tương ứng
            // const orders = await Order.find({ userId });
            const orders = await Order.find({ userid: userId }).lean();
            console.log(orders);
            // return res.json(orders); // Ví dụ: Trả về các đơn hàng dưới dạng JSON
            res.render('checkorders', { orders, authenticated: req.session.authenticated || false }); 

          } catch (error) {
            console.error('Lỗi tìm kiếm đơn hàng:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    
}

module.exports = new CheckorderController();


