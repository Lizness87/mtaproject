var express=require("express");

var path = require('path');

var bodyParser=require('body-parser');
var connection = require('./config');
var app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');
 
var authenticateController=require('./controllers/authenticate-controller');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('assets'))

//Redirect homepage to login

app.get('/', function (req, res) {  
res.redirect('/login');
})

//Load login.html after redirecting to login

app.get('/login', function (req, res) {  
	res.render('pages/login');  
})


//Load parent homepage after authentication as a parent

app.get('/login/parent', function (req, res) {
	res.render('pages/homepageparent');
})


//Load manager homepage after authentication as a manager

app.get('/login/manager', function (req, res) {
	res.render('pages/homepagemanager' );
})

//Load assistant homepage after authentication as an assistant

app.get('/login/assistant', function (req, res) {
	res.render('pages/homepageassistant' );
})


/* route to handle login */
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.listen(5000);
