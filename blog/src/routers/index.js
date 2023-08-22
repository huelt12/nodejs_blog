const newsRouter = require('./news');
const coursesRouter = require('./courses');
const detailRouter = require('./detail');
const promotionRouter = require('./promotion');
const checkoutRouter = require('./checkout');
const cartRouter = require('./cart');
const heartsRouter = require('./hearts');
const siteRouter = require('./site');


function route(app){

    app.use('/hearts', heartsRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/cart', cartRouter);
    app.use('/promotion', promotionRouter);
    // Chị dùng sai đường dẫn, ở đây là /bookfree/detail mà
    
    app.use('/bookfree/detail', detailRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter); 
    
}

module.exports = route;