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
 /* getUsersBySimilarInterests : (MostIntersets, callBack) => {
    pool.query(
        `select UserName,Email,mobile,Location,Socre from user where 
        MostIntersets like ?`,
        [`%${ MostIntersets }%`] ,
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
        }
    );
  },*/
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
};











