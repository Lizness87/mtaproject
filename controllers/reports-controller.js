connection = require('./../config');
express = require('express');
var app = express();
app.use(express.static('assets'));

module.exports.DBupdate1=function(req,res){
app.use(express.static('assets'));
var sql = `INSERT INTO reports (date, status, child_name) VALUES ('${req.body.date}', '${req.body.status_report}','${req.body.child_name}')`;
connection.query(sql, function (err, result) {                
    if (err)
    	{
    		console.log(err);
    		res.redirect('/homepageassistant');
    	}
    else {
    	res.redirect('/reports-manager-auth');
    }
  });
}

module.exports.DisplayReports=function(req,res){
app.use(express.static('assets'));
connection.query('SELECT child_name FROM child WHERE uid=?',[req.query.uid], function (err, child_result)
    { // last   
        if (err){
            console.log(err);
            res.render('pages/homepageparent', {uid:req.query.uid});
            }else{
            child = child_result;
            connection.query('SELECT *, DATE_FORMAT(date, "%m-%d-%y") FROM reports WHERE child_name=?', [child], function (err, reports_result) 
                    {   
                    if (err)
                        {
                        console.log(err);
                        res.render('pages/homepageparent', {uid:req.query.uid});    
                        }                 
                    else {
                     res.render('pages/reportparent', {data:reports_result, uid:req.query.uid});
                    }
            });
    }
  });
}


// // module.exports.DisplayReports=function(req,res){
// // app.use(express.static('assets'));             
// // // connection.query('SELECT *, DATE_FORMAT(date, "%m-%d-%y") AS date FROM reports', function (err, reports_result) 
//     {   
//         if (err){
//             console.log(err);
//             //TODO: Error handling to browser
//             res.redirect('/homepageparent');
//         }
//         else {
//             res.render('pages/reportparent', {data:reports_result, uid:req.query.uid});
//     }
//   });
// }


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