
const path = require('path')
const express = require('express');
const morgan = require('morgan')
const { engine } = require('express-handlebars');

const route = require('./routers');
const db = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// socket
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: true,
    cookie: { secure: false  }
  }))

// app.use(morgan('combined'));
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(bodyParser.json());


app.engine('hbs', engine({
    extname : ".hbs" 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


app.get('/bookstore', (req, res) => {
    res.render('auth/login',{layout: "login"});
});


//route init
route(app);


app.listen(port, () => { 
    console.log(`App listening at port http://localhost:${port}`)});