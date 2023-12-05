const Course = require('../Models/Couserse')
const Heart = require('../Models/Heart')
const {mongooseToObject} = require('../../util/mongoose');

class HeartController { 

    index(req, res){
        res.render('heart', {authenticated: req.session.authenticated || false});
    }
    async addToHeart(req, res, next) {
        try {
            console.log(req.body);
            let id = req.body.id;
            
            let userid = "";
            if (req.session.user) {
                userid = req.session.user.userId;
            }
            console.log(userid);
            // // const { heart } = req.body;
            // // Tạo một đối tượng để lưu vào MongoDB
            const newHeart = new Heart({
                userid, 
                id,           
            });
            const result = await Heart.findOne({ userid: userid, id: id }).exec();
            if (result) {
                console.log("Sách đã tồn tại trong bảng hearts của người dùng.");
                // res.status(400).json({ message: "Sách đã tồn tại trong danh sách yêu thích." });
            } else {
                await newHeart.save();
                console.log("Sách đã được thêm vào danh sách yêu thích.");
            }
            return res.json({ message: 'Sách đã được thêm vào "hearts" thành công.' });
        } catch (error) {
            console.error('Lỗi khi thêm sách vào "hearts":', error);
            return res.status(500).json({ error: 'Lỗi khi thực hiện yêu cầu.' });
        }
    }

    async getAllhearts(req, res, next) {
        const userId = req.session.user ? req.session.user.userId : ""; // Lấy userId từ session của người dùng đăng nhập
        console.log("userId get all order");
        console.log(userId);
        try {
            const hearts = await Heart.find({ userid: userId }).lean();
            console.log(hearts); 
            let heartInfo = [];
            await Promise.all(hearts.map(async (data) => {
                let info = await Course.findById(data.id).lean();
                heartInfo.push(info);
            }));
            console.log(heartInfo);
            res.render('heart', { heartInfo, authenticated: req.session.authenticated || false }); 

          } catch (error) {
            console.error('Lỗi tìm kiếm đơn hàng:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    }
    delete(req, res, next){
        const userId = req.session.user ? req.session.user.userId : "";

        Heart.deleteOne({id: req.params.id, userid: userId})
        .then(() => res.redirect('back'))
        .catch(next);
    }
} 

module.exports = new HeartController; 