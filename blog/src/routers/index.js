const newsRouter = require('./news');
const coursesRouter = require('./courses');
const detailRouter = require('./detail');
const promotionRouter = require('./promotion');
const checkoutRouter = require('./checkout');
const cartRouter = require('./cart');
const heartRouter = require('./heart');
const siteRouter = require('./site');
const authRoute = require('./auth');
const forgetpassRouter = require('./forgetpass');
const reviewRouter = require('./review');
const checkorderRouter = require('./checkorder');
const ordersRouter = require('./orders');

 
function route(app){

    app.use('/orders', ordersRouter);
    app.use('/checkorder', checkorderRouter);
    app.use('/auth/forgetpass', forgetpassRouter);
    app.use('/auth', authRoute);
    app.use('/heart', heartRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/cart', cartRouter);
    app.use('/promotions', promotionRouter);
    app.use('/review', reviewRouter);
    app.use('/bookfree/detail', detailRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter); 
}

module.exports = route;

