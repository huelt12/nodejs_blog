const Review = require('../Models/Review');
const {mongooseToObject} = require('../../util/mongoose');


const addReview = async (req, res) => {
  try {
    const { rating, message, username } = req.body;

    // Tạo một bản ghi đánh giá mới
    const newReview = new Review({
      rating,
      message,
      username,
    });

    // Lưu bản ghi vào CSDL
    await newReview.save();
    // Trả về đánh giá mới đã được lưu để hiển thị trên trang
    res.status(201).json({ success: true, review: newReview });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi thêm đánh giá' });
    }
};

module.exports = {
  addReview,
};

