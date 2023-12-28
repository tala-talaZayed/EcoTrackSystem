const {create,getUsers,getUserByEmail,updateCurrentUser, deleteCurrentUser
   ,getUsersBySimilarLocation, getUsersByUserName,addSample } = require("./user.service");
const {genSaltSync , hashSync , compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const activeSessions = {};
module.exports = {
    createUser : (req,res)=>{
        const body = req.body ;
        const salt = genSaltSync(10);
        body.Password = hashSync(body.Password,salt);        
        create(body , (err,results)=>{
          if(err){
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({
                  success: 0,
                  message: "Duplicate email or user id!"
              });
            } else {
              return res.status(500).json({
                  success: 0,
                  message: "Database connection error!"
              });
            }
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
            message: "Record not Found!"
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
      getUserByEmail(body.Email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password!"
          });
        }           
        const passwordMatch = compareSync(body.Password,results.Password);
        if (!passwordMatch) {
          results.Password = undefined;
          jsontoken = sign({ result : results },"qwe1234",{expiresIn: "10m"});
          activeSessions[exports.PUBLIC_currentLoggedInUserEmail] = true;
          return res.json(
          {
            success: 1,
            message: "login done successfully!",
            token: jsontoken 
          });          
        }else {
          return res.json({
            success: 0,
            data: "Invalid email or password!"
          });
        }
      });
    },
    logout : (req, res) => {
      if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
        activeSessions[exports.PUBLIC_currentLoggedInUserEmail] = false;
        return res.json({
          success: 1,
          message: "Logout successful"
        });
      } 
      else {
        return res.json({
          success: 0,
          data: "Currently there is no user logged in."
        });
      }
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
            message:  "You are logged out! Please login."
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
        message: "You are logged out! Please login."
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
          message: "You are logged out! Please login."
        });
   
      }
    },

    updateCurrentUser : (req, res ) => {
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
          message:  "You are logged out! Please login."
        }); 
      }
    },
    addSample : (req,res)=>{
      const body = req.body ;      
      addSample(body,(err,results)=>{
      if(err){
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
              success: 0,
              message: "Duplicate SampleId ! "
          });
        } 
        else if (err=="notify"){
          return res.status(200).json({
              success : 1 , 
              data : results , 
              message : "added succesfully ! ",
              Notification : "The threshold exceeded !"
          });
        }
        else if (err=="not found!"){
          return res.status(500).json({
              success : 0 ,
              message : "The threshold not found due to userID and dataID !",
          });
        }
        else {
          return res.status(500).json({
            success : 0 ,
            message : "database connection error!",
        });
        }
      }
        else {
          return res.status(200).json({
            success : 1 , 
            data : results , 
            message : "added succesfully ! "
        });
         }
      }
      );
    }
};