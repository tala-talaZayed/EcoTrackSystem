const pool = require ("../../DB/database");
const currentEmail = require('./user.controller');
module.exports = {
  create :(data,callBack)=> {    
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
              return  callBack(error)
            }
              return callBack(null, results)
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
    )
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

  addSample: (data,callBack)=>{
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












