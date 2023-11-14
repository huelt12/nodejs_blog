const Course = require('../Models/Couserse')
const Cart = require('../Models/Cart')
const {mongooseToObject} = require('../../util/mongoose');

class CartController {

    index(req, res){
        res.render('cart', {authenticated: req.session.authenticated || false});
    }

    // GET /courses/:slug 
    show(req, res, next){      
        Course.find({})
            .then(courses => {         
                res.render('cart', {courses: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
                .catch(next);           
    }

    checkout(req, res, next){
        Course.find({})
            .then(courses => {         
                res.render('checkout', {courses: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
                .catch(next); 
    }
    async addToCart (req, res) {
        try {
            console.log(req.body);
            let id = req.body.id;
            
            let userid = "";
            if (req.session.user) {
                userid = req.session.user.userId;
            }
            console.log(userid);
            const newCart = new Cart({
                userid, 
                id,           
            });
            const result = await Cart.findOne({ userid: userid, id: id }).exec();
            if (result) {
                console.log("Sách đã tồn tại trong bảng carts của người dùng.");
            } else {
                await newCart.save();
                console.log("Sách đã được thêm vào danh sách giỏ hàng.");
            }
            return res.json({ message: 'Sách đã được thêm vào "carts" thành công.' });
        } catch (error) {
            console.error('Lỗi khi thêm sách vào "carts":', error);
            return res.status(500).json({ error: 'Lỗi khi thực hiện yêu cầu.' });
        }     
    }
    async getAllcarts(req, res, next) {
        const userId = req.session.user ? req.session.user.userId : ""; // Lấy userId từ session của người dùng đăng nhập
        // console.log("userId get all order");
        // console.log(userId);
        try {
            const carts = await Cart.find({ userid: userId }).lean(); 
            console.log(carts);
            let cartInfo = [];
            await Promise.all(carts.map(async (data) => {
                let info = await Course.findById(data.id).lean();
                cartInfo.push(info);
            }));
            console.log(cartInfo);
            res.render('cart', { cartInfo, authenticated: req.session.authenticated || false }); 

          } catch (error) {
            console.error('Lỗi tìm kiếm đơn hàng:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    delete(req, res, next){
        const userId = req.session.user ? req.session.user.userId : "";

        Cart.deleteOne({id: req.params.id, userid: userId})
        .then(() => res.redirect('back'))
        .catch(next);
    }
} 

module.exports = new CartController; 