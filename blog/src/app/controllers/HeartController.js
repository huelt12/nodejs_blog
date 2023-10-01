const Course = require('../Models/Couserse')
const Heart = require('../Models/Heart')
const {mongooseToObject} = require('../../util/mongoose');

class HeartController {

    index(req, res){
        res.render('heart', {authenticated: req.session.authenticated || false});
    }

    show(req, res, next){      
        Course.find({})
            .then(courses => {         
                res.render('heart', {courses: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
                .catch(next);           
    }
    
} 

module.exports = new HeartController;