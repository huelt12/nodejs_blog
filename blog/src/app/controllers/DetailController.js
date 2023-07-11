const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class DetailController {

    index(rep, res){
        res.render('detail');
    }

    // GET /courses/:slug
    show(req, res, next){

        // Course.findOne({slug: req.params.slug})
        //     .then(course => {
        //         res.render('courses/show', {course: mongooseToObject(course)})
        //     })
        //     .catch(next); 
        
        Course.find({})
            .then(courses => {         
                res.render('detail', {courses: mongooseToObject(course)})
            })
                .catch(next);           
    }
    
}

module.exports = new DetailController;