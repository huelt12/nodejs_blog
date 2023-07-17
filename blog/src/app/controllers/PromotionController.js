const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class PromotionController {

    index(req, res){
        res.render('promotion');
    }

    // GET /courses/:slug
    show(req, res, next){
        
        Course.find({})
            .then(courses => {         
                res.render('promotion', {courses: mongooseToObject(course)})
            })
                .catch(next);           
    }
    
}

module.exports = new PromotionController;