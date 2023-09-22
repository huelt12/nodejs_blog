const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class CourseController {
    // GET /courses/:slug
    show(req, res, next){
        Course.findOne({slug: req.params.slug})
        // res.render('courses/show', {course.})
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course),
                    authenticated: req.session.authenticated || false
                })
            })
            .catch(next); 
    }
 
    // [GET]   /course/:_id/add_cart

    add_cart(req, res, next){
        Course.findById({_id: req.params._id})
            .then(course => {
                res.render('courses/add_cart', {course: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
            .catch(next);
    }

}

module.exports = new CourseController;
