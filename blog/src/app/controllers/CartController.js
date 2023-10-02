const Course = require('../Models/Couserse')
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
    // show(req, res, next){      
    //     Course.find({})
    //         .then(courses => {
    //             // Lưu danh sách các sách vào session
    //             req.session.cartCourses = courses.map(course => course.toObject());
    //             res.render('cart', {
    //                 courses: mongooseToObject(courses),
    //                 authenticated: req.session.authenticated || false
    //             });
    //         })
    //         .catch(next);
    // }
    checkout(req, res, next){
        Course.find({})
            .then(courses => {         
                res.render('checkout', {courses: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
                .catch(next); 
    }


    // checkout(req, res, next){
    //     // Truy cập danh sách các sách từ session
    //     const cartCourses = req.session.cartCourses || [];
        
    //     res.render('checkout', {
    //         courses: cartCourses, // Sử dụng danh sách các sách từ session
    //         authenticated: req.session.authenticated || false
    //     });
    // }


    // checkout(req, res, next) {
    //     Course.find({}) // Lấy danh sách khóa học
    //         .then(courses => {
    //             res.render('checkout', { 
    //                 courses: mongooseToObject(courses), 
    //                 authenticated: req.session.authenticated || false,
    //                 // Truyền thông tin khóa học dưới dạng tham số URL
    //                 courseName: req.query.courseName,
    //                 coursePrice: req.query.coursePrice,
    //             });
    //         })
    //         .catch(next);
    // }
}

module.exports = new CartController; 