connection = require('./../config');
express = require('express');
var app = express();
app.use(express.static('assets'));

//Render user's UID to registration pages

module.exports.registration1=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/registration1', {uid: req.query.uid});
};

module.exports.registration2=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/registration2', {uid: req.query.uid});
};
module.exports.registration3=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/registration3', {uid: req.query.uid});
};
module.exports.registration4=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/registration4', {uid: req.query.uid});
};

module.exports.registration5=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/registration5', {uid: req.query.uid});
};    

//Redirects to homepages

module.exports.RedirectHomepageParent=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/homepageparent', {uid: req.body.uid});
};

module.exports.RedirectHomepageManager=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/homepagemanager', {uid: req.body.uid});
};


module.exports.RedirectHomepageAssistant=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/homepageassistant', {uid: req.body.uid});
};

//DB updates for registration forms

module.exports.DBupdate1=function(req,res){
var main_parent = `UPDATE main_parent SET parent1_id=${req.body.id1}, parent1_name='${req.body.fname1}', parent1_lastname='${req.body.sname1}', parent1_phone=${req.body.phone1}, parent1_email='${req.body.email1}', parent1_address='${req.body.address1}' WHERE uid=${req.body.uid}`;
var sub_parent = `UPDATE sub_parent SET parent2_id=${req.body.id2}, parent2_name='${req.body.fname2}', parent2_lastname='${req.body.sname2}', parent2_phone=${req.body.phone2}, parent2_email='${req.body.email2}', parent2_address='${req.body.address2}' WHERE uid=${req.body.uid}`;
connection.query(main_parent, function (err, result) {
    if (err){console.log(err)};
  });
connection.query(sub_parent, function (err, result) {
    if (err){console.log(err)};
  });
app.use(express.static('assets'));
res.redirect('/registration2' + '?uid=' + req.body.uid);
}

module.exports.DBupdate2=function(req,res){
app.use(express.static('assets'));
var child = `UPDATE child SET child_name='${req.body.chname}', child_lastname='${req.body.chsname}',sex='${req.body.gender}',child_id=${req.body.chid}, birth='${req.body.chbd}', child_address='${req.body.chadress}', health_org='${req.body.chmed}',main_contact='${req.body.name3}', child_phone=${req.body.phone3} WHERE uid=${req.body.uid}`;
connection.query(child, function (err, result) {
    if (err){console.log(err)};
  });
res.redirect('/registration3' + '?uid=' + req.body.uid);
}

module.exports.DBupdate3=function(req,res){
app.use(express.static('assets'));
var child = `UPDATE child SET food='${req.body.message}', nutrition_notes='${req.body.message1}', sleep_notes='${req.body.message2}', general_notes='${req.body.message3}', important_notes='${req.body.message4}' WHERE uid=${req.body.uid}`;
connection.query(child, function (err, result) {
    if (err){console.log(err)};
  });
res.redirect('/registration4' + '?uid=' + req.body.uid);
}

module.exports.DBupdate4=function(req,res){
app.use(express.static('assets'));
var child = `UPDATE child SET days_choice=${req.body.days} WHERE uid=${req.body.uid}`;
res.redirect('/registration5' + '?uid=' + req.body.uid);
}



// module.exports.add_event=function(req,res){
//     // connection.query('SELECT * FROM child WHERE uid=?',[req.body.uid], function (error, result) {
//     // 	var data = {'id': 1, 'name':'yosi'}
//     // 	for (var i = result.length - 1; i >= 0; i--) {
//     // 		data[]=result[i]
//     // 	}
//     // }
//     var data = req.body
//     app.use(express.static('assets'));
//     res.render('pages/yeled', data);
// };