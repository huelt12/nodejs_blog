const Order = require('../Models/Order'); // Import Model

class OrderController {
    async getAllOrders(req, res) {
        try {
            const orders = await Order.find(); // Truy vấn tất cả đơn hàng từ MongoDB
            res.json(orders); // Trả về dữ liệu đơn hàng dưới dạng JSON
        } catch (error) {
            console.error('Lỗi khi truy vấn đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi khi truy vấn đơn hàng' });
        }
    }
}

module.exports = new OrderController();
