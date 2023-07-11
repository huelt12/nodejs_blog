const newsRouter = require('./news');
const coursesRouter = require('./courses');
const detailRouter = require('./detail');
const siteRouter = require('./site');

function route(app){

    app.use('/bookfree/detail', detailRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter); 
    
}

module.exports = route;