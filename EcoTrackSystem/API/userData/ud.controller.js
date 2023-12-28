const {addNewDataInterestForCurrentUser,deleteDataInterestForCurrentUser,getTheCurrentUserIntrest,getSpecificDataThresholdforCurrentUser, 
    updateSpecificDataThresholdforCurrentUser} = require("./ud.service");

const userController = require('../users/user.controller');
let email = userController.getCurrenUserEmail();
       
 let jsontoken ;
 module.exports = {
     addNewDataInterest : (req,res)=>{ email=userController.getCurrenUserEmail();    
      if(email && email!==''){
         const body = req.body ;     
         addNewDataInterestForCurrentUser(body , (err,results)=>{
           if(err){
              console.log(err);
              return res.status(500).json({
                success :0 ,
                message : "An error occurred! This Interest has not been inserted!"
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
     deleteDataInterest : (req, res) => { 
      email=userController.getCurrenUserEmail();    
      if(email && email!==''){
        const dataId = req.params.dataId;
         deleteDataInterestForCurrentUser(dataId,(err, results) =>{
          if (err) {
            console.log(err);
            return;
          }
          if (results.affectedRows == 0) {
            return res.json({
              success: 0,
              message: "This Interest not found!"
            });
          } 
          return res.json({
            success: 1,
            message: "Deleted Successfully!"
          });
        });
        }else{
          return res.json({
            success: 0,
            message: "You are logged out !"
          });
     
        }
      },
      
      getTheCurrentUserIntrest: (req, res) => {
        email=userController.getCurrenUserEmail();    
        if(email && email!==''){
            getTheCurrentUserIntrest((err, results) =>{
              if (err) {
                console.log(err);
                return;
              }
              if (!results || results.length === 0) {
                return res.json({
                  success: 0,
                  message: "You haven't select any data interests yet!"
                });
              }
              return res.json({
                success: 1,
                data: results
              });
            });
            }else{
              return res.json({
                success: 0,
                message: "You are logged out !"
              }); 
            }
     },

     getSpecificDataThresholdforCurrentUser: (req, res) => {
          email=userController.getCurrenUserEmail();    
          if(email && email!==''){
            const dataId = req.params.dataId;
            getSpecificDataThresholdforCurrentUser( dataId , (err, results) =>{
              if (err) {
                console.log(err);
                return;
              }
              if (!results || results.length === 0) {
                return res.json({
                  success: 0,
                  message: "Can't find this data interests!"
                });
              }
              return res.json({
                success: 1,
                data: results
              });
            });
            }else{
              return res.json({
                success: 0,
                message: "You are logged out !"
              }); 
            }
     },
    
     updateSpecificDataThresholdforCurrentUser : (req, res) => {
       const body = req.body ; 
        email=userController.getCurrenUserEmail();    
        if(email && email!==''){
        updateSpecificDataThresholdforCurrentUser( body , (err, results) =>{
         if (err) {
           console.log(err);
           return;
         }
         if (results.affectedRows == 0) {
           return res.json({
             success: 0,
             message: "Can't find this data interests!"
           });
         }
         return res.json({
           success: 1,
           message: "Updated Successfully!"
         });
       });
       }else{
         return res.json({
           success: 0,
           message: "you are logged out !"
         }); 
       }
     }
 }
       
     
 
 