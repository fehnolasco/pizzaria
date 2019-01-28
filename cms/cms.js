var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var cms = express();

//connect mongoDB
var mongoUri = 'mongodb://feh:fefezin123@localhost:27017/pizzaria';
mongoose.connect(mongoUri);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'Connection to Mongo failed: '));

//all environments
cms.set('port', process.env.PORT || 3000);
cms.set('views', __dirname + '/views');
cms.set('view engine', 'ejs');
cms.use(express.favicon());
cms.use(express.logger('dev'));
cms.use(bodyParser.urlencoded({extended: false}));
cms.use(bodyParser.json());
cms.use(express.methodOverride());
cms.use(express.static(path.join(__dirname, 'public')));
cms.use(session({
   resave: true,
   saveUninitialized: true,
   secret: 'bella te amo!',
   store: new MongoStore({
      url: mongoUri,
      autoRconnect: true
   })
}));


/*
 * GET requests
 */
var admAuth = require("./controllers/admin_auth");
var catalog = require("./controllers/catalog");

//GET AUTH
cms.get('/', admAuth.index);
cms.get('/auth', admAuth.getLogin);
cms.get('/signup', admAuth.getSignup);
cms.get('/:admin', admAuth.adminDetail);
//--------------------------------------//
//GET CATALOG FORM
cms.get('/catalog/pizza', catalog.listPizza);
cms.get('/catalog/esfirra', catalog.listEsfiha);
cms.get('/catalog/bebida', catalog.listDrinks);
cms.get('/catalog/pizza#create', catalog.getPizza);
cms.get('/catalog/esfirra#create', catalog.getEsfiha);
cms.get('/catalog/bebida#create', catalog.getDrinks);
cms.get('/catalog/pizza#update', catalog.getUpdatePizza);
cms.get('/catalog/esfirra#update', catalog.getUpdateEsfiha);
cms.get('/catalog/bebida#update', catalog.getUpdateDrinks);
cms.get('/catalog/pizza#delete', catalog.getDeletePizza);
cms.get('/catalog/esfirra#delete', catalog.getDeleteEsfiha);
cms.get('/catalog/bebida#delete', catalog.getDeleteDrinks);
//--------------------------------------//


/*
 * POST requests
 */

//POST AUTH
cms.post('/auth', admAuth.postLogin);
cms.post('/signup', admAuth.postSignup);
//--------------------------------------//
//POST CATALOG FORM
cms.post('/catalog/pizza#create', catalog.postPizza);
cms.post('/catalog/esfirra#create', catalog.postEsfiha);
cms.post('/catalog/bebidas#create', catalog.postDrinks);
//--------------------------------------//
//POST UPDATE CATALOG
cms.post('/catalog/pizza#update', catalog.postUpdatePizza);
cms.post('/catalog/esfirra#update', catalog.postUpdateEsfiha);
cms.post('/catalog/bebida#update', catalog.postUpdateDrinks);
//--------------------------------------//
//POST CATALOG FORM
cms.post('/catalog/pizza#delete', catalog.postDeletePizza);
cms.post('/catalog/esfirra#delete', catalog.postDeleteEsfiha);
cms.post('/catalog/bebidas#delete', catalog.postDeleteDrinks);
//--------------------------------------//


if ('development' === cms.get('env')) {
   cms.use(express.errorHandler());
}

module.exports = cms;