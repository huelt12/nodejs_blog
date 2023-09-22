const Order = require('../Models/Order');
const { mongooseToObject } = require('../../util/mongoose');

class CheckorderController {
    async showOrder(req, res) {
    try {
        // Lấy orderId từ session hoặc cookie
        const orderID = req.session.orderId;

        // Truy vấn cơ sở dữ liệu để lấy thông tin đơn hàng
        const order = await Order.findById(orderID);


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
    getAllOrders(req, res, next) {
        Order.findOne({_id: req.params._id })
            .then(order => {
                if (!order) {
                    return res.status(404).render('error', { error: 'Không tìm thấy đơn hàng' });
                }
                res.render('checkorder', {
                    order: mongooseToObject(order),
                    authenticated: req.session.authenticated || false
                });
            })
            .catch(next);
    }
}

module.exports = new CheckorderController();


