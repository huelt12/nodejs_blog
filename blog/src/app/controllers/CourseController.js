const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class CourseController {
    // GET /courses/:slug
    show(req, res, next){
        Course.findOne({slug: req.params.slug})
        // res.render('courses/show', {course.})
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course)})
            })
            .catch(next); 
    }
}

module.exports = new CourseController;