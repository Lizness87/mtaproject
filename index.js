var express=require("express");
var path = require('path');

var bodyParser=require('body-parser');
var connection = require('./config');
var app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');

var authenticateController=require('./controllers/authenticate-controller');
var registrationController=require('./controllers/registration-controller');
var childController=require('./controllers/child-controller');
var paymentsController=require('./controllers/payments-controller');
var reportsController=require('./controllers/reports-controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('assets'));

//Redirect homepage to login

app.get('/', function (req, res) {
    res.redirect('/login');
});

//Load login after redirecting to login

app.get('/login', function (req, res) {
    res.render('pages/login');

});


// app.get('/homepageparent', function (req, res) {
//     res.render('pages/homepageparent');

// });

// app.get('/homepagemanager', function (req, res) {
//     res.render('pages/homepagemanager');

// });

// app.get('/homepageassistant', function (req, res) {
//     res.render('pages/homepageassistant');

// });




//Routes to handle Payments

app.get('/payments-manager', function (req, res) {
    connection.query('SELECT child_name FROM child', function (err, child_result) 
    {
        console.log(child_result);
        if (err){
            res.redirect('/homepagemanager1');
        } else {
            res.render('pages/paymentmanager1', {children:child_result});
        }
    });
});

app.get('/payments-manager-auth', function (req, res) {
    res.render('pages/paymentmanager2');
});


//Routes to handle Weekly Reports

app.get('/reports-manager', function (req, res) {
    connection.query('SELECT child_name FROM child', function (err, child_result) 
    {
        console.log(child_result);
        if (err){
            res.redirect('/homepageassistant1');
        } else {
            res.render('pages/reports-manager', {children:child_result});
        }
    });
});

app.get('/reports-manager-auth', function (req, res) {
    res.render('pages/reports-manager-auth');

});


/* route to handle login */
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
console.log(authenticateController);

/* routes to handle registration */
app.get('/registration1',registrationController.registration1);
app.get('/registration2',registrationController.registration2);
app.get('/registration3',registrationController.registration3);
app.get('/registration4',registrationController.registration4);
app.get('/registration5',registrationController.registration5);

/*route to handle redirection to homepage parent */
app.get('/homepageparent',registrationController.RedirectHomepageParent);
app.get('/homepagemanager',registrationController.RedirectHomepageManager);
app.get('/homepageassistant',registrationController.RedirectHomepageAssistant);

/* route to handle display child account */ 
app.get('/child-account',childController.childaccount);
app.get('/child-account-manager',childController.childaccountManager)
app.get('/child-account-assistant',childController.childaccountAssistant)

/* routes to diplay payments to parent */
app.get('/payments-parent', paymentsController.DisplayPayments); 

/* routes to display reports to parent */
app.get('/reports-parent', reportsController.DisplayReports);

/* routes to handle authentication and DB updates */ 

app.post('/controllers/register1-controller', registrationController.DBupdate1);
app.post('/controllers/register2-controller', registrationController.DBupdate2);
app.post('/controllers/register3-controller', registrationController.DBupdate3);
app.post('/controllers/register4-controller', registrationController.DBupdate4);
app.post('/controllers/payments-controller', paymentsController.DBupdate1); 
app.post('/controllers/reports-controller', reportsController.DBupdate1); 


/* routes to handle events */ 

app.get('/events', function (req, res) {
    res.render('pages/events');

});

app.get('/events-auth', function (req, res) {
    res.render('pages/events-auth');

});

app.post('/events', function (req, res) {
    event_date = req.body['event_date'];
    event_description = req.body['event_description'];
    connection.query(`INSERT INTO Events VALUES(STR_TO_DATE('${event_date}', '%b %d, %Y'), '${event_description}')`);
    res.render('pages/events-auth')
    // res.sendFile(__dirname + "/" + "events.html");
});

app.get('/get_events_list', function (req, res) {
    connection.query('SELECT DATE_FORMAT(eventDate, \'%b %d, %Y\') AS eventDate, eventDescription FROM sadna.Events WHERE eventDate > CURDATE()', function(error, results, fields){
        if (error){
            res.send(error);
        }
        else{
            res.send(results);
        }
    });
});


app.listen(5000);

