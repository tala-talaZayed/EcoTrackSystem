const {create,getUsers,getUserByEmail,deleteUser, updateUser ,getUsersBySimilarLocation,
  getUsersBySimilarInterests , getUsersByUserName } = require("./user.service");
const {genSaltSync , hashSync , compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

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

    deleteUser : (req, res) => {
      const UserId = req.params.UserId;
      deleteUser( UserId , (err, results) =>{
        if (err) {
          console.log(err);
          return;
        }
        if (results.affectedRows == 0) {
          return res.json({
            success: 1,
            message: "not found"
          });
        }
        return res.json({
          success: 1,
          message: "deleted!"
        });
      });
    },



    updateUser : (req, res) => {
      //const UserId = req.params.UserId ; 
      const body = req.body ;
      const salt = genSaltSync(10);
      body.Password =hashSync(body.Password,salt);  
    updateUser( body , (err, results) =>{
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
    },  
    
    login: (req, res) => {
      const body = req.body;
      getUserByEmail(body.Email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password !"
          });
        }           
        const passwordMatch = compareSync(body.Password,results.Password);
        if (!passwordMatch) {
          results.Password = undefined;
          const jsontoken = sign({ result : results },"qwe1234",{expiresIn: "10m"});
          return res.json(
            {
            success: 1,
            message: "login done successfully !",
            token: jsontoken
          });
        }else {
          return res.json({
            success: 0,
            data: "Invalid email or password !!"
          });
        }
      });
    },
    getUsersBySimilarInterests : (req, res) => {
      const Interests = req.params.MostIntersets;
      getUsersBySimilarInterests(Interests , (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
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
    } , 
    getUsersByUserName : (req, res) => {
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
    }
}




