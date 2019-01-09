connection = require('./../config');
express = require('express');
var app = express();
app.use(express.static('assets'));

// module.exports.paymentsParent=function(req,res){
// // app.use(express.static('assets'));
// // var child = `UPDATE child SET child_name='${req.body.chname}', child_lastname='${req.body.chsname}',sex='${req.body.gender}',child_id=${req.body.chid}, birth='${req.body.chbd}', child_address='${req.body.chadress}', health_org='${req.body.chmed}',main_contact='${req.body.name3}', child_phone=${req.body.phone3} WHERE uid=${req.body.uid}`;
// // connection.query(child, function (err, result) {
// //     if (err){console.log(err)};
// //   });
// // res.redirect('/registration3' + '?uid=' + req.body.uid);
// }

module.exports.DBupdate1=function(req,res){
app.use(express.static('assets'));
//var values = [req.body.fpayment, req.body.hpayment, req.body.aapayment];
var sql = `INSERT INTO payments (payment_name, amount, payment_notes, child_name) VALUES ('${req.body.fpayment}', ${req.body.hpayment} ,'${req.body.aapayment}' ,'${req.body.child_name}')`;
console.log('############');
console.log(sql);

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
connection.query('SELECT * FROM payments', function (err, payments_result) 
    {   
        if (err){
            console.log(err);
            //TODO: Error handling to browser
            res.redirect('/homepageparent1');
        }
        else {
        	 res.render('pages/paymentparent', {data:payments_result, uid:req.query.uid});
        	
    	}
  	});
}

