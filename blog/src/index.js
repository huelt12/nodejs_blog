// const path = require('path')
// const express = require('express')
// const morgan = require('morgan')
// const handlebars = require('express-handlebars')

// const app = express()
// const port = 3000

// //HTTP logger
// app.use(morgan('combined'))

// //template engine


// app.engine('handlebars', handlebars());
// app.set('view engine', 'handlebars');
// app.set('view', path.join(__dirname, 'src','resources','views'));

// app.get('/trangchu', (req, res) => {
//   res.render('home');
// })

// app.listen(port, () => {
//   console.log(`Example app listening at port http://localhost:${port}`)
// })
const path = require('path')
const express = require('express');
const morgan = require('morgan')
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

//app.use(express.static(path.join(__dirname,'public')))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'))

app.engine('hbs', engine({
    extname : ".hbs"
}));
app.set('view engine', 'hbs');
//app.set('views', './resources/views');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/new', (req, res) => {
    res.render('new');
});

app.listen(port, () => { console.log(`Example app listening at port http://localhost:${port}`)})