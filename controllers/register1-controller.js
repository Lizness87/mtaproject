var app = express();
module.exports.authenticate=function(req,res){
var fname1=req.body.fname1;
var sname1=req.body.sname1;
var id1=req.body.id1;
var address1=req.body.address1;
var phone1=req.body.phone1;
var email1=req.body.email1;
var fname2=req.body.fname2;
var sname2=req.body.sname2;
var id2=req.body.id2;
var address2=req.body.address2;
var phone2=req.body.phone2;
var email2=req.body.email2;
var uid=req.query.uid;


 app.use(express.static('assets'));
 connection.query('SELECT * FROM main_parent WHERE uid = ?',[uid], function (error, parent_result, fields) {
       if (error) {
       	 // console.log("error ocurred",error);
            res.send({
               "code":400,
              "failed":"error ocurred"
           });
        }else{
        	parent_result[0].parent1_name==fname1;
        	parent_result[0].parent1_lastname==sname1;
        	parent_result[0].parent1_id==id1;
        	parent_result[0].parent1_phone==phone1;
        	parent_result[0].parent1_email==email1;
        	parent_result[0].parent1_address==address1;
        }
    }
};