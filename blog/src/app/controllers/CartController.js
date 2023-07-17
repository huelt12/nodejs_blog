const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class CartController {

    index(req, res){
        res.render('cart');
    }

    // GET /courses/:slug
    show(req, res, next){
        
        Course.find({})
            .then(courses => {         
                res.render('cart', {courses: mongooseToObject(course)})
            })
                .catch(next);           
    }
    
}

module.exports = new CartController;