connection = require('./../config');
express = require('express');
var app = express();
app.use(express.static('assets'));


//Display registration forms to users with parent privilige
module.exports.childaccount=function(req,res){
	app.use(express.static('assets'));
    var data1={}, data2={}, data3={}; //initialize data arrays

    //connection.query('SELECT * FROM child WHERE uid=?',[req.query.uid], function (err, child_result)
    connection.query('SELECT *, DATE_FORMAT(birth, "%m-%d-%y") AS birth FROM child WHERE uid=?',[req.query.uid], function (err, child_result)  
    {	
        if (err){
            console.log(err);
            res.render('pages/child', {data1:data1, data2:data2, data3: data3, uid:req.query.uid}); 
        }else{
             data1 = child_result;
            connection.query('SELECT * FROM main_parent WHERE uid=?',[req.query.uid], function (err, main_parent_result) {  
                if (err){
                    console.log(err);
                    res.render('pages/child', {data1:data1, data2:data2, data3: data3, uid:req.query.uid}); 
                }else{
                    data2 = main_parent_result;    
                    connection.query('SELECT * FROM sub_parent WHERE uid=?',[req.query.uid], function (err, sub_parent_result) {  
                    if (err){
                        console.log(err);
                        res.render('pages/child', {data1:data1, data2:data2, data3: data3, uid:req.query.uid}); 
                    }else{
                       data3 = sub_parent_result; 
                       res.render('pages/child', {data1:data1, data2:data2, data3: data3, uid:req.query.uid}); 
                    }
                       
                  });
                }
                
              });

        }
        
    });
}
//Display registration forms to users with manager priviliges

module.exports.childaccountManager=function(req,res){
    app.use(express.static('assets'));
    var data1={}, data2={}, data3={};
    connection.query('SELECT *, DATE_FORMAT(birth, "%m-%d-%y") AS birth FROM child', function (err, child_result) 
    {   
        if (err){
            console.log(err);
            res.render('pages/child-manager', {data1:data1, data2:data2, data3: data3}); 
        }else{
            data1 = child_result;
            connection.query('SELECT * FROM main_parent', function (err, main_parent_result) {  
                if (err){
                    console.log(err);
                    res.render('pages/child-manager', {data1:data1, data2:data2, data3: data3}); 
                }else{
                    data2 = main_parent_result;    
                    connection.query('SELECT * FROM sub_parent', function (err, sub_parent_result) {  
                    if (err){
                        console.log(err);
                        res.render('pages/child-manager', {data1:data1, data2:data2, data3: data3}); 
                    }else{
                       data3 = sub_parent_result; 
                       res.render('pages/child-manager', {data1:data1, data2:data2, data3: data3}); 
                    }
                       
                  });
                }
                
              });

        }
        
    });  
}

//Display registration forms to users with assistant priviliges
    module.exports.childaccountAssistant=function(req,res){
    app.use(express.static('assets'));
    var data1={}, data2={}, data3={};
    connection.query('SELECT * FROM child', function (err, child_result) 
    {   
        if (err){
            console.log(err);
            //TODO: Error handling to browser
            res.render('pages/child-assistant', {data1:data1, data2:data2, data3: data3}); 
        }else{
            data1 = child_result;
            connection.query('SELECT * FROM main_parent', function (err, main_parent_result) {  
                if (err){
                    console.log(err);
                    res.render('pages/child-assistant', {data1:data1, data2:data2, data3: data3}); 
                }else{
                    data2 = main_parent_result;    
                    connection.query('SELECT * FROM sub_parent', function (err, sub_parent_result) {  
                    if (err){
                        console.log(err);
                        res.render('pages/child-assistant', {data1:data1, data2:data2, data3: data3}); 
                    }else{
                       data3 = sub_parent_result; 
                       res.render('pages/child-assistant', {data1:data1, data2:data2, data3: data3}); 
                    }
                       
                  });
                }
                
              });

        }
        
    });  


}