// const Book_free = require('../Models/Book_free')
const Course = require('../Models/Couserse')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');

class DetailController {

    async detail(req, res, next){
        Course.find({isBookfree: true})
             .then(book_frees => {    
                // console.log(book_frees);     
                 res.render('detail', {
                    book_frees: mutipleMongooseToObject(book_frees),
                    authenticated: req.session.authenticated || false
                 });
             })
             .catch(next);
    
    } 
    
    async book_frees(req, res, next){

        Course.findOne({slug: req.params.slug})
            .then(book_free => {
                // console.log(book_free)
                // res.render('book_frees', { pdfUrl: book_free.pdf });
                res.render('book_frees', {book_free: mongooseToObject(book_free),authenticated: req.session.authenticated || false });
            })
            .catch(next); 
    }

}

module.exports = new DetailController;