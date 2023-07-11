const Course = require('../Models/Couserse')
const {mutipleMongooseToObject} = require('../../util/mongoose');

class SiteController {
    //[get] /trangchu

    async home(req, res, next){
            // Đọc
        // let courses = await Course.find({});
        // courses = courses.map(course => course.toObject());
        // res.render('home', {courses});

            // Tạo mới
        // const courses = await Course.create({
        // name: "sachhay",
        // description: "Mo ta sach",
        // image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2019/12/truyen-dai-nguyen-nhat-anh-13-696x928.jpg?fit=700%2C20000&quality=95&ssl=1",
        // })

        
        // Đọc từ BD
         Course.find({})
             .then(courses => {         
                 res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                 });
             })
             .catch(next);



        // //res.render('home');
        // res.json(courses)
    }
    //[get] /search
    search(req, res){
        res.render('search');
    }

}

module.exports = new SiteController;