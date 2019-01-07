connection = require('./../config');
express = require('express');
var app = express();
module.exports.authenticate=function(req,res){
    var username=req.body.uname;
    var password=req.body.psw;


    app.use(express.static('assets'));
    connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, user_result, fields) {
       if (error) {
            // console.log("error ocurred",error);
            res.send({
               "code":400,
              "failed":"error ocurred"
           });
        }else{
             // console.log('The solution is: ', results);
             if(user_result.length >0){
                if(user_result[0].password == password){
                    console.log(JSON.stringify(user_result[0]));
                    if (user_result[0].privilege=='parent') {
                       var data={uid:user_result[0].uid};
                        res.render('pages/homepageparent', data);
                    }
                    else if (user_result[0].privilege=='manager') {
                         var data={uid:user_result[0].uid};
                        res.render('pages/homepagemanager', data);
                   }
                    else if (user_result[0].privilege='assistant') {
                         var data={uid:user_result[0].uid};
                    res.render('pages/homepageassistant', data);

                   }
    
                }else{
                    res.send({
                       "code":204,
                         "success":"Username and password does not match"
                    });
                 }
             }
    
    
             else{
                 res.send({
                    "code":204,
                    "success":"Username does not exist"
               });
            }
         }
    });
};
