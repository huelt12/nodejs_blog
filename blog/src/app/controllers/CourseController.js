const Course = require('../Models/Couserse')
const Review = require('../Models/Review')
const {mongooseToObject} = require('../../util/mongoose');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class CourseController {  
    // GET /courses/:slug  
    async  show(req, res, next) {
        try {
            const slug = req.params.slug;
            // Lấy thông tin của cuốn sách đã chọn
            const course = await Course.findOne({ slug }).lean();
    
            if (!course) {
                return res.status(404).send('Không tìm thấy sách');
            }
    
            // Tìm các sách cùng tác giả
            const author = course.author;
            const authorBooks = await Course.find({ author }).lean();
            const reviews = await Review.find({courseId: course._id}).lean();
            // Loại bỏ cuốn sách đã chọn khỏi danh sách
            const filteredAuthorBooks = authorBooks.filter(book => book.slug !== slug);
            
            console.log(course, 'course');
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
            .then(course => {
                res.render('courses/add_cart', {course: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
            .catch(next);
    }



}

module.exports = new CourseController;
