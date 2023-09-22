const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class HeartsController {

    index(req, res){
        res.render('hearts', {authenticated: req.session.authenticated || false});
    }

    show(req, res, next){     
        Course.find({})
            .then(courses => {         
                res.render('hearts', {courses: mongooseToObject(course), authenticated: req.session.authenticated || false})
            })
                .catch(next);           
    }
    
}

module.exports = new HeartsController;