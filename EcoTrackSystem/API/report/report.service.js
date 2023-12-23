const pool = require ("../../DB/database");
const userController = require('../users/user.controller');
let Email = userController.getCurrenUserEmail();
//console.log(Email);  // Outputs: your email

module.exports = {
  createReport :(data,callBack)=> {  
    Email = userController.getCurrenUserEmail();
    pool.query(
      `select UserId from user where Email= ?`,
      [Email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results){
          pool.query(
            `insert into reports(Title, Description, Location,UserId) values (?,?,?,?)`
            ,[
              data.Title,
              data.Description, 
              data.Location ,    
              results[0].UserId,
            ],
            (error, results, fields) => {
                if (error) {
                 return callBack(error);
                }
                return callBack(null, results);
            } 
        );
        }
        else{
          return callBack(null,null);
        }
    }
    ); 
  } , 
  deleteReport :(Title,callBack)=> {    
    Email = userController.getCurrenUserEmail();
    pool.query(
      `select UserId from user where Email= ?`,
      [Email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results){
          pool.query(
            `delete from reports where UserId = ? AND Title like ?`
            ,[
              results[0].UserId,
              `%${Title}%`
            ],
            (error, results, fields) => {
                if (error) {
                 return callBack(error);
                }
                return callBack(null, results);
            } 
        );
        }
        else{
          return callBack(null,null);
        }
    }
    ); 
  },
  updateReport : (Title,data,callBack) => {
    Email = userController.getCurrenUserEmail();
    pool.query(
      `select UserId from user where Email= ?`,
      [Email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        //test        
        console.log (results[0].UserId);
        if (results){
          pool.query(
            `update reports set Title=?, Description=?,Location=? where UserId = ? AND Title like ?`,
            [data.Title,
             data.Description,
             data.Location,   
            results[0].UserId,
            `%${Title}%`
            ],
            (error, results, fields) => {
                if (error) {
                 return callBack(error);
                }
                return callBack(null, results);
            } 
        )
        }
        else{
          return callBack(null,null);
        }
    }
    );
  },
//Admin
  getAllReports: (callBack) => {
    //const Email = currentEmail.PUBLIC_currentLoggedInUserEmail;
    pool.query(
        `select * from reports`,
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
        }
    );
  },


};











