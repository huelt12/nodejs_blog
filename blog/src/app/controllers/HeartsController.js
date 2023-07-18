const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class HeartsController {

    index(req, res){
        res.render('hearts');
    }

    show(req, res, next){     
        Course.find({})
            .then(courses => {         
                res.render('hearts', {courses: mongooseToObject(course)})
            })
                .catch(next);           
    }
    
}

module.exports = new HeartsController;