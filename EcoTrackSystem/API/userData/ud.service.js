const pool = require ("../../DB/database");
const userController = require('../users/user.controller');
let Email = userController.getCurrenUserEmail();
module.exports = {
  addNewDataInterestForCurrentUser :(data,callBack)=> {    
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
            `insert into user_data(UserId,DataId,Threshold) values (?,?,?)`
            ,[
              results[0].UserId,
              data.dataId, 
              data.threshold ,    
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
  deleteDataInterestForCurrentUser :(dataId,callBack)=> {    
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
            `delete from user_data where UserId = ? AND DataId = ?`
            ,[
              results[0].UserId,
              dataId,
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
  
  getTheCurrentUserIntrest: (callBack) => {
    Email = userController.getCurrenUserEmail();
    pool.query(
      `select UserId from user where Email= ?`,
      [Email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results){
          pool.query( `SELECT ecodata.DataId,ecodata.DataName,ecodata.DataGroup,user_data.Threshold
          FROM user_data
          INNER JOIN user ON user.UserId = user_data.UserId
          INNER JOIN ecodata ON ecodata.DataId = user_data.DataId
          WHERE user_data.UserId = ?`,
          [results[0].UserId],
          (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
        }
        else{
          return callBack(null,null);
        }
    }
    ); 
  },

  getSpecificDataThresholdforCurrentUser: (dataId,callBack) => {
    Email = userController.getCurrenUserEmail();
    pool.query(
      `select UserId from user where Email= ?`,
      [Email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results){
          pool.query( `SELECT Threshold FROM user_data WHERE UserId = ? AND DataId= ?`,
          [results[0].UserId,dataId],
          (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
        }
        else{
          return callBack(null,null);
        }
    }
    ); 
  },

  updateSpecificDataThresholdforCurrentUser : ( data,callBack) => {
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
            `update user_data set Threshold=? where UserId = ? AND DataId =?`,
            [data.Threshold,results[0].UserId,data.dataId],
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

};











