// const Promotion = require('../Models/Promotion')
const Course = require('../Models/Couserse')

const {mutipleMongooseToObject} = require('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose');

class PromotionController { 

    async promotion(req, res, next){
    // Đọc từ BD
        Course.find({isPromotion: true})
         .then(promotions => {         
             res.render('promotion', {
                promotions: mutipleMongooseToObject(promotions), 
                authenticated: req.session.authenticated || false
             });
         })
         .catch(next);
    }

    async  show(req, res, next) {
        try {
            const slug = req.params.slug;
            // Lấy thông tin của cuốn sách đã chọn
            const course = await Course.findOne({ slug }).lean();
    
            if (!course) {
                return res.status(404).send('Không tìm thấy khóa học');
            }
    
            // Tìm các sách cùng tác giả
            const author = course.author;
            const authorBooks = await Course.find({ author }).lean();
            const reviews = await Review.find( {courseId: course._id}).lean()
            console.log(reviews, "reviews");
            // Loại bỏ cuốn sách đã chọn khỏi danh sách
            const filteredAuthorBooks = authorBooks.filter(book => book.slug !== slug);
            res.render('courses/show', {
                course: course,
                reviews: reviews,
                authorBooks: filteredAuthorBooks,
                authenticated: req.session.authenticated || false
            });
            
        } catch (error) {
            next(error);
        }
    }

    add_cart(req, res, next){
        Course.findById({_id: req.params._id})
            .then(promotion => {
                res.render('promotions/add_cart', 
                {promotion: mongooseToObject(promotion), 
                authenticated: req.session.authenticated || false})
            })
            .catch(next);
    }


    
}

module.exports = new PromotionController;