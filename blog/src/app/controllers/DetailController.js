const Course = require('../Models/Couserse')
const {mongooseToObject} = require('../../util/mongoose');

class DetailController {

    index(req, res){
        res.render('detail');
    }

    // GET /courses/:slug
    show(req, res, next){     
        Course.find({})
            .then(courses => {         
                res.render('detail', {courses: mongooseToObject(course)})
            })
                .catch(next);           
    }
    
}

module.exports = new DetailController;