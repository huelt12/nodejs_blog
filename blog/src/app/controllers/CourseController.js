const Course = require('../Models/Couserse')
const Review = require('../Models/Review')
const {mongooseToObject} = require('../../util/mongoose');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class CourseController {  
    // GET /courses/:slug
    // show(req, res, next){ 
    //     Course.findOne({slug: req.params.slug})
    //         .then(course => {
    //             res.render('courses/show', {course: mongooseToObject(course),
    //                 authenticated: req.session.authenticated || false
    //             })
    //         })
    //         .catch(next); 
    // }

    
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

            // Loại bỏ cuốn sách đã chọn khỏi danh sách
            const filteredAuthorBooks = authorBooks.filter(book => book.slug !== slug);

            res.render('courses/show', {
                course: course,
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

    async saveReview(req, res) {
        try {
        const { id, fullName, message, rating} = req.body;
        let userid = "";
            if (req.session.user) {
                userid = req.session.user.userId;
            }
        // Tạo một đánh giá mới để lưu vào data
        const newReview = new Review({
            userid,
            id,
            fullName,
            message,
            rating,
        });
        // Lưu đánh giá vào MongoDB
        await newReview.save();
        res.redirect('/courses/show');
        
        } catch (error) {
        next(error);
        }
    }

}

module.exports = new CourseController;
