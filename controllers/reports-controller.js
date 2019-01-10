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
    {    
        if (err){
            console.log(err);
            res.render('pages/homepageparent', {uid:req.query.uid});
            }else{
            connection.query('SELECT *, DATE_FORMAT(date, "%d-%m-%y") AS date FROM reports WHERE child_name=?', [child_result[0].child_name], function (err, reports_result) 
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
