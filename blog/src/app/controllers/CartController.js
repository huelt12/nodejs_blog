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
    
    checkout(req, res, next){
        Course.find({})
            .then(courses => {         
                res.render('checkout', {courses: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
                .catch(next); 
    }
}

module.exports = new CartController; 