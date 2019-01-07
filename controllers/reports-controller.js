connection = require('./../config');
express = require('express');
var app = express();
app.use(express.static('assets'));

module.exports.DBupdate1=function(req,res){
app.use(express.static('assets'));
var sql = `INSERT INTO reports (date, status, child_name) VALUES (STR_TO_DATE(${req.body.date}, '%b %d, %Y'), '${req.body.status_report}','${req.body.child_name}')`;
connection.query(sql, function (err, result) {
    if (err)
    	{
    		console.log(err);
    		res.redirect('/homepageassistant1');
    	}
    else {
    	res.redirect('/reports-manager-auth');
    }
  });
}

module.exports.DisplayReports=function(req,res){
app.use(express.static('assets'));
connection.query('SELECT * FROM reports', function (err, reports_result) 
    {   
        if (err){
            console.log(err);
            //TODO: Error handling to browser
            res.redirect('/homepageparent1');
        }
        else {
            res.render('pages/reportparent', {data:reports_result});
    }
  });
}


// module.exports.DisplayReports=function(req,res){
// app.use(express.static('assets'));
// var child =connection.query('SELECT child_name FROM child WHERE uid=${req.query.uid}', function (err, reports_result) 
//     {   
//         if (err){
//             console.log(err);
//             //TODO: Error handling to browser
//             res.redirect('/homepageparent1');
//         }
//         else {
//             res.render('pages/reportparent', {data:reports_result});
//     }
//   });
// }