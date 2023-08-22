const Book_free = require('../Models/Book_free')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');

class DetailController {

    async detail(req, res, next){
        Book_free.find()
             .then(book_frees => {    
                console.log(book_frees);     
                 res.render('detail', {
                    book_frees: mutipleMongooseToObject(book_frees)
                 });
             })
             .catch(next);
    
    }
    
    async book_frees(req, res, next){

        Book_free.findOne({slug: req.params.slug})
            .then(book_free => {
                // console.log(book_free)
                // res.render('book_frees', { pdfUrl: book_free.pdf });
                res.render('book_frees', {book_free: mongooseToObject(book_free)});
            })
            .catch(next); 
    }
}

module.exports = new DetailController;