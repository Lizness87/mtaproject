connection = require('./../config');
module.exports.authenticate=function(req,res){
    var username=req.body.uname;
    var password=req.body.psw;
    connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'There are some errors with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                res.json({
                    status:true,
                    message:'Successfully authenticated'
                })
            }else{
                res.json({
                  status:false,
                  message:"Username and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"Username does not exist"
          });
        }
      }
    });
}
