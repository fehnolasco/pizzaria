
/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

var routes = require('./controllers/index');
var orders = require('./controllers/orders');
var user = require('./controllers/user');

// connect mongoDB
var mongoUri = 'mongodb://feh:fefezin123@localhost:27017/pizzaria';
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'Connection to Mongo failed: '));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
   resave: true,
   saveUninitialized: true,
   secret: 'bella te amo',
   store: new MongoStore({
      url: mongoUri,
      autoRconnect: true
   })
}));

/*
 * GET requests
 */
// Auth
app.get('/', routes.index);
app.get('/login', routes.getLogin);
app.get('/register', routes.getRegister);
app.get('/galeria', routes.gallery);
app.get('/sobre', routes.about);
app.get('/uservalidation', routes.user_validation);
// User
app.get('/user/:id', user.user_detail);
// Orders
app.get('/user/:id/finalizar-pedido', orders.getOrder);


/*
 * POST requests
 */

app.post('/login', routes.postLogin);
app.post('/register', routes.postRegister);
app.post('/user/:id', routes.logout);



// development only
if ('development' === app.get('env')) {
   app.use(express.errorHandler());
}

module.exports = app;
