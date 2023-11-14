const Review = require('../Models/Review');
const {mongooseToObject} = require('../../util/mongoose');


const addReview = async (req, res) => {
  try {
    const {
      fullName,  
      message, 
      rating,
      courseId
    } = req.body;
    console.log(req.body, "body");
    let userid = "";
            if (req.session.user) {
                userid = req.session.user.userId;
            }
    // Tạo một bản ghi đánh giá mới
    const newReview = new Review({
      courseId,
      userid,
      fullName,
      message,
      rating,
    });
    await newReview.save();
    // res.redirect(req.get('referer'));
    res.status(201).json({ success: true, review: newReview });    
    } catch (error) {
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi thêm đánh giá' });
    }
};
const displayReviews = async (req, res) => {
  try {
      const reviews = await Review.find({ courseId : courseId}).lean(); 
      console.log(reviews);
      res.render('show', { reviews });
    
  } catch (error) {
      console.error(error);
      res.status(500).send('Đã xảy ra lỗi trong quá trình hiển thị đánh giá.');
  }
};
module.exports = {
  addReview,
  displayReviews,
};


