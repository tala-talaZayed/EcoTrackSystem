const {create,getUsers,getUserByEmail,updateCurrentUser, deleteCurrentUser
   ,getUsersBySimilarLocation,getUsersBySimilarInterests, getUsersByUserName } = require("./user.service");
const {genSaltSync , hashSync , compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const activeSessions = {};
let currentemail = '';
      
let jsontoken ;
module.exports = {
    createUser : (req,res)=>{
        const body = req.body ;
        const salt = genSaltSync(10);
        body.Password = hashSync(body.Password,salt);        
        create(body , (err,results)=>{
          if(err){
             console.log(err);
             return res.status(500).json({
               success :0 ,
               message : "database connection error !"
             });
          }
            return res.status(200).json({
              success : 1 , 
              data : results 
            }
        );
        }
        );
    },

    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },  

    getUserByEmail : (req, res) => {
      const Email = req.params.Email;
      getUserByEmail(Email, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    
    login: (req, res) => {
      const body = req.body;
      exports.PUBLIC_currentLoggedInUserEmail = body.Email ;
      currentemail = body.Email;
      //console.log(body.Email);
      //console.log("in user controller login"+currentemail );
      getUserByEmail(body.Email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          currentemail = '';
          return res.json({
            success: 0,
            data: "Invalid email or password !"
          });
        }           
        const passwordNotMatch = compareSync(body.Password,results.Password);
        if (!passwordNotMatch) {
          results.Password = undefined;
          jsontoken = sign({ result : results },"qwe1234",{expiresIn: "10m"});
          activeSessions[exports.PUBLIC_currentLoggedInUserEmail] = true;
          return res.json(
          {
            success: 1,
            message: "login done successfully !",
            token: jsontoken 
          });          
        }else {
          currentemail = '';
          return res.json({
            success: 0,
            data: "Invalid email or password !!"
          });
        }
      });
    },
    logout : (req, res) => {
      if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
        activeSessions[exports.PUBLIC_currentLoggedInUserEmail] = false;
        currentemail = '';
        console.log("from logout1:" + exports.PUBLIC_currentLoggedInUserEmail);
        return res.json({
          success: 1,
          message: "Logout successful"
        });
      } 
      else {
        console.log("from logout2:" + exports.PUBLIC_currentLoggedInUserEmail);
        return res.json({
          success: 0,
          data: "User not currently logged in"
        });
      }
    },
     getUsersBySimilarInterests : (req, res) => {
      getUsersBySimilarInterests((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results || results.length === 0 ) {
          return res.json({
            success: 0,
            message: "There are no users with similar interests !"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },    
    getUsersBySimilarLocation : (req, res) => {
      if(activeSessions[exports.PUBLIC_currentLoggedInUserEmail]){
      const Location = req.params.Location ;
      getUsersBySimilarLocation(Location , (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "There are no users with similar Location !"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
      } else{
          return res.json({
            success: 1,
            message: "you are logged out !"
          });
        }
    } , 
    getUsersByUserName : (req, res) => {
      if(activeSessions[exports.PUBLIC_currentLoggedInUserEmail]){

      const UserName = req.params.UserName ;
      getUsersByUserName(UserName , (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "There are no users with this UserName!"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    }else{
      return res.json({
        success: 1,
        message: "you are logged out !"
      });
 
    }
    },

    deleteCurrentUser : (req, res) => {
      if(activeSessions[exports.PUBLIC_currentLoggedInUserEmail]){
        deleteCurrentUser((err, results) =>{
        if (err) {
          console.log(err);
          return;
        }
        if (results.affectedRows == 0) {
          return res.json({
            success: 0,
            message: "not found"
          });
        } 
        return res.json({
          success: 1,
          message: "deleted!"
        });
      });
      }else{
        return res.json({
          success: 1,
          message: "you are logged out !"
        });
   
      }
    },

    updateCurrentUser : (req, res) => {
      const body = req.body ;
      const salt = genSaltSync(10);
      body.Password =hashSync(body.Password,salt);  
      if(activeSessions[exports.PUBLIC_currentLoggedInUserEmail]){
      updateCurrentUser( body , (err, results) =>{
        if (err) {
          console.log(err);
          return;
        }
        if (results.affectedRows == 0) {
          return res.json({
            success: 0,
            message: "not found"
          });
        }
        return res.json({
          success: 1,
          message: "updated!"
        });
      });
      }else{
        return res.json({
          success: 1,
          message: "you are logged out !"
        }); 
      }
    },
     getCurrenUserEmail: () => {
        //console.log("in user controller get "+currentemail );
      return currentemail;
  }
  
}
      
    

