const path = require('path')
const express = require('express');
const morgan = require('morgan')
const { engine } = require('express-handlebars');

const route = require('./routers');
const db = require('./config/db');
const session = require('express-session');



// Connect to DB
db.connect();

const app = express();
const port = 3000;



app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(morgan('combined'));
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

app.engine('hbs', engine({
    extname : ".hbs" 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

//route init
route(app);


app.listen(port, () => { 
    console.log(`App listening at port http://localhost:${port}`)});