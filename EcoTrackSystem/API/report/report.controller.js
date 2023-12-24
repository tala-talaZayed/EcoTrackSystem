const {createReport,deleteReport,updateReport,getAllReports } = require("./report.service");
const userController = require('../users/user.controller');
let email = userController.getCurrenUserEmail();

 module.exports = {
    createReport : (req,res)=>{
       email=userController.getCurrenUserEmail();    
       console.log( email);
        if(email && email!==''){
         const body = req.body ;  
         console.log("body: "+body.Title );
         createReport(body , (err,results)=>{
           if(err){
              console.log(err);
              return res.status(500).json({
                success :0 ,
                message : "An error occurred! This Report has not been submitted!"
              });
           }
             return res.status(200).json({
               success : 1 , 
               data : results 
             }
         );
         }
         );
        }else{
            return res.json({
              success: 0,
              message: "You are logged out !"
            });
       
          }

     },
     deleteReport : (req, res) => {
      email=userController.getCurrenUserEmail();  
        if(email && email!==''){
        const Title = req.params.Title;
        deleteReport(Title,(err, results) =>{
          if (err) {
            console.log(err);
            return;
          }
          if (results.affectedRows == 0) {
            return res.json({
              success: 0,
              message: "There is no report with this Titel!"
            });
          } 
          return res.json({
            success: 1,
            message: "Deleted Successfully!"
          });
        });
        }else{
          return res.json({
            success: 1,
            message: "You are logged out !"
          });
     
        }
      },
      updateReport : (req, res) => {
        const body = req.body ; 
        const Title = req.params.Title;
        email=userController.getCurrenUserEmail();  
        if(email && email!==''){
            updateReport( Title,body , (err, results) =>{
          if (err) {
            console.log(err);
            return;
          }
          if (results.affectedRows == 0) {
            return res.json({
              success: 0,
              message: "Can't find a report with this Titel submitted by you!"
            });
          }
          return res.json({
            success: 1,
            message: "Updated Successfully!"
          });
        });
        }else{
          return res.json({
            success: 1,
            message: "you are logged out !"
          }); 
        }
      },

     getAllReports: (req, res) => {
      const isAdmin = req.decoded.result.isAdmin || false;
      if(isAdmin){
        getAllReports((err, results) => {
         if (err) {
           console.log(err);
           return;
         }
         return res.json({
           success: 1,
           data: results
         });
       });
      }
      else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
      }
     },  
 
     
 }
       
     
 
 