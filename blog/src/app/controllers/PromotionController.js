const Promotion = require('../Models/Promotion')
const {mutipleMongooseToObject} = require('../../util/mongoose')
const {mongooseToObject} = require('../../util/mongoose');

class PromotionController {

    async promotion(req, res, next){
    // Đọc từ BD
        Promotion.find({})
         .then(promotions => {         
             res.render('promotion', {
                promotions: mutipleMongooseToObject(promotions), 
                authenticated: req.session.authenticated || false
             });
         })
         .catch(next);
    }

    show(req, res, next){
        Promotion.findOne({slug: req.params.slug})
            .then(promotion => {
                res.render('promotions/show', 
                {promotion: mongooseToObject(promotion),
                authenticated: req.session.authenticated || false});
            })
            .catch(next); 
    }

    add_cart(req, res, next){
        Promotion.findById({_id: req.params._id})
            .then(promotion => {
                res.render('promotions/add_cart', 
                {promotion: mongooseToObject(promotion), 
                authenticated: req.session.authenticated || false})
            })
            .catch(next);
    }


    
}

module.exports = new PromotionController;