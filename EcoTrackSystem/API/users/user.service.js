const pool = require ("../../DB/database");
const currentEmail = require('./user.controller');
module.exports = {
  create :(data,callBlack)=> {    
    pool.query( 
        `insert into user(UserId,UserName,Email,Password,mobile,Location,Socre)
        values (?,?,?,?,?,?,?)` , 
        [
        data.UserId ,
            data.UserName,
            data.Email ,
            data.Password ,
            data.mobile , 
            data.Location,
            data.Socre
        ],

        (error , results , fields)=>{
            if (error){
              return  callBlack(error)
            }
              return callBlack(null, results)
        }
    );
  } ,

  getUserByEmail : (Email, callBack) => {
    pool.query(
        `select UserId,UserName,Email,Password,mobile,Location,Socre from user where Email=?`,
        [Email],
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
  },

  deleteCurrentUser : ( callBack) => {
    const Email = currentEmail.PUBLIC_currentLoggedInUserEmail ;
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
            `delete from user where UserId = ?`,
            [results[0].UserId],
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

  updateCurrentUser : (data, callBack) => {
    const Email = currentEmail.PUBLIC_currentLoggedInUserEmail;
    pool.query(
      `select UserId from user where Email= ?`,
      [Email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results){
          pool.query(
            `update user set UserName=?,Email=?, Password=?, mobile=?,Location=?,Socre=? where UserId = ?`
            ,[
              data.UserName, 
              data.Email , 
              data.Password ,
              data.mobile ,
              data.Location ,
              data.Socre,
              results[0].UserId 
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
  getUsersBySimilarInterests : (callBack) => {
    const Email = currentEmail.PUBLIC_currentLoggedInUserEmail ;
    pool.query(
        `SELECT
        user.username,user.email,user.location,user.mobile,GROUP_CONCAT(ecodata.dataId) AS dataIds,GROUP_CONCAT(ecodata.dataname) AS datanames,GROUP_CONCAT(ecodata.datagroup) AS groups
        FROM
            user_data
        INNER JOIN
            user ON user_data.userId = user.userId
        INNER JOIN
            ecodata ON user_data.dataId = ecodata.dataId
        WHERE
            user_data.dataId IN (
                SELECT dataId
                FROM user_data
                WHERE userId = (SELECT userId FROM user WHERE email = ?)
            ) AND user.Email != ?
        GROUP BY
            user.userId, user.username, user.email, user.location`,
        [Email,Email] ,
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
        }
    );
  },
  getUsersBySimilarLocation : (Location, callBack) => {
    pool.query(
        `select UserName,Email,mobile,Location,Socre from user where 
        Location like ?`,
        [`%${Location}%`] ,
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
        }
    );
  },
  
  getUsersByUserName : (UserName, callBack) => {
    pool.query(
        `select Email,mobile,Location from user where 
        UserName like ?`,
        [`%${UserName}%`] ,
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
        }
    );
  }, 
  getUserIsAdmin : (UserId,callBack) =>{
    pool.query(
      `select IsAdmin from user where UserId = ?`,
      [UserId] ,
      (error, results, fields) => {
          if (error) {
           return callBack(error);
          }
          return callBack(null, results);
      }
  );
  },  addSample: (data,callBack)=>{
    pool.query(
      'select Threshold FROM user_data WHERE UserId = ? AND DataId = ?',
      [data.UserId, data.DataId],
      (error, results, fields) => {
        if (error) {
          return  callBack(error)
        }
        var addError = null;
        if (results.length > 0) {
          const threshold = results[0].Threshold;
          if (data.Value > threshold) {
            console.log('Notify: Value exceeds the threshold!');
            addError = "notify";
          }
          pool.query(
            'INSERT INTO sample (SampleId ,UserId, DataId, Value, Soruce) VALUES (?, ?, ?, ?, ?)',
            [ data.SampleId ,
              data.UserId,
              data.DataId, 
              data.Value, 
              data.Soruce
            ],
            (error, results, fields) => {
              if (error) {
                return  callBack(error);
              }
              return  callBack(addError,results);
            }
          );
        }
        else {       
          return  callBack("not found!",results);
        }
      }
    );
  }


     
};