connection = require('./../config');
express = require('express');
var app = express();
app.use(express.static('assets'));


module.exports.DBupdate1=function(req,res){
app.use(express.static('assets'));
var sql = `INSERT INTO payments (payment_name, amount, payment_notes, child_name) VALUES ('${req.body.fpayment}', ${req.body.hpayment} ,'${req.body.aapayment}' ,'${req.body.child_name}')`;

connection.query(sql, function (err, result) {
    if (err)
    	{
    		console.log(err);
    		res.redirect('/homepagemanager1');
    	}
    else {
    	res.redirect('/payments-manager-auth');
    }
  });
}


module.exports.DisplayPayments=function(req,res){
app.use(express.static('assets'));
connection.query('SELECT child_name FROM child WHERE uid=?',[req.query.uid], function (err, child_result)
    { 
        if (err){
            console.log(err);
            res.render('pages/homepageparent', {uid:req.query.uid});
        } else 
        {
            console.log(child_result);
            connection.query('SELECT * FROM payments WHERE child_name=?', [child_result[0].child_name], function (err, payments_result) 
                    {   
                    if (err)
                        {
                        console.log(err);
                        res.render('pages/homepageparent', {uid:req.query.uid});    
                        }                 
                    else {
                        console.log('bamba');
                     console.log(payments_result);
                     res.render('pages/paymentparent', {data:payments_result, uid:req.query.uid});
                    }
            });
        }
  });
}



