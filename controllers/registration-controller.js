connection = require('./../config');


express = require('express');
var app = express();
module.exports.registration1=function(req,res){
    app.use(express.static('assets'));
    res.render('pages/registration1', {uid: req.query.uid});
};

//TODO - Copy HTML to EJS
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