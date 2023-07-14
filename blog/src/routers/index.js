const newsRouter = require('./news');
const coursesRouter = require('./courses');
const detailRouter = require('./detail');
const promotionRouter = require('./promotion');
const checkoutRouter = require('./checkout');
const cartRouter = require('./cart');
const siteRouter = require('./site');


function route(app){

    app.use('/checkout', checkoutRouter);
    app.use('/cart', cartRouter);
    app.use('/promotion', promotionRouter);
    app.use('/bookfree/detail', detailRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter); 
    
}

module.exports = route;