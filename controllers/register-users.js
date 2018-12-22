connection = require('./../config');
express = require('express');
var app = express();
module.exports.authenticate=function(req,res){
var username=req.body.uname;
var password=req.body.psw;
app.use(express.static('assets'))

connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, user_result, fields) {
