const axios = require('axios')
const { create, getUsers, getUserByEmail, updateCurrentUser, deleteCurrentUser
  , getUsersBySimilarLocation, getUsersBySimilarInterests, getUsersByUserName, getUserIsAdmin } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const activeSessions = {};
let currentemail = '';
let jsontoken;
const weatherAPIkey = 'http://api.weatherapi.com/v1/current.json?key=0d95cb28cfb14002900183946232712&q=Palestine&aqi=yes'

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.Password = hashSync(body.Password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "database connection error !"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
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

  getUserByEmail: (req, res) => {
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
    exports.PUBLIC_currentLoggedInUserEmail = body.Email;
    currentemail = body.Email;
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

      //console.log();
      let isAdmin;
      getUserIsAdmin(results.UserId, (err1, results1) => {
        if (err1) {
          console.log(err1);
        }
        if (results1) {
          //currentemail = '';
          isAdmin = results1[0].IsAdmin || false;
          // to ensure synchronous operations so the other code will completed 
          //after this method complete, then the isAdmin is defined
          executeOtherCode(isAdmin);
        }
      });
      function executeOtherCode(isAdmin) {
        const passwordNotMatch = compareSync(body.Password, results.Password);
        console.log("IS Admin outside: " + isAdmin);
        if (!passwordNotMatch) {
          results.Password = undefined;
          const payload = { result: { ...results, isAdmin } };
          jsontoken = sign(payload, "qwe1234", { expiresIn: "10m" });
          activeSessions[exports.PUBLIC_currentLoggedInUserEmail] = true;
          return res.json(
            {
              success: 1,
              message: "login done successfully !",
              token: jsontoken
            });
        } else {
          currentemail = '';
          return res.json({
            success: 0,
            data: "Invalid email or password !!"
          });
        }
      }
    });
  },
  logout: (req, res) => {
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
  getUsersBySimilarInterests: (req, res) => {
    getUsersBySimilarInterests((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results || results.length === 0) {
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
  getUsersBySimilarLocation: (req, res) => {
    if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
      const Location = req.params.Location;
      getUsersBySimilarLocation(Location, (err, results) => {
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
    } else {
      return res.json({
        success: 1,
        message: "you are logged out !"
      });
    }
  },
  getUsersByUserName: (req, res) => {
    if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {

      const UserName = req.params.UserName;
      getUsersByUserName(UserName, (err, results) => {
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
    } else {
      return res.json({
        success: 1,
        message: "you are logged out !"
      });

    }
  },

  deleteCurrentUser: (req, res) => {
    if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
      deleteCurrentUser((err, results) => {
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
    } else {
      return res.json({
        success: 1,
        message: "you are logged out !"
      });

    }
  },

  updateCurrentUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.Password = hashSync(body.Password, salt);
    if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
      updateCurrentUser(body, (err, results) => {
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
    } else {
      return res.json({
        success: 1,
        message: "you are logged out !"
      });
    }
  },
  getCurrenUserEmail: () => {
    //console.log("in user controller get "+currentemail );
    return currentemail;
  },

  getUserIsAdmin: (req, res) => {
    getUserIsAdmin(userId, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },   /*
    const userId= results.UserId;  
    let isAdmin; 
    getUserIsAdmin ((err2, results2)  => {
      if (err2) {
        console.log(err2);
        return;
      }
      console.log(results2);
      isAdmin = results2.IsAdmin || false;
      console.log("isAdmin inside callback:", isAdmin);

    });
    console.log("isAdmin outside callback:", isAdmin);*/

  getUserWeather: async (req, res) => {
    const city = req.params.city;

    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=yes`);
          const weatherData = response.data;

      return res.json({
        success: 1,
        data: weatherData
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: 'Error fetching weather data'
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
}