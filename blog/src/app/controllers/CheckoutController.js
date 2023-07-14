const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class CheckoutController {

    index(rep, res){
        res.render('checkout');
    }

    // GET /courses/:slug
    show(req, res, next){
        
        Course.find({})
            .then(courses => {         
                res.render('checkout', {courses: mongooseToObject(course)})
            })
                .catch(next);           
    }
    
}

module.exports = new CheckoutController;