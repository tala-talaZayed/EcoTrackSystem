const pool = require ("../../DB/database");//import
const currentEmail = require('./user.controller');

module.exports = {
  //create will recive data from controoler and will callback
  create :(data,callBlack)=> {    
    pool.query( 
        //for query function pass three values 1.query 2.values from user 3.callback 
        `insert into user(UserId,UserName,Email,Password,mobile,MostIntersets,Location)
        values (?,?,?,?,?,?,?)` , 
        //the values from user
        [
            data.UserId ,
            data.UserName,
            data.Email ,
            data.Password ,
            data.mobile ,
            data.MostIntersets , 
            data.Location
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
        `select UserId,UserName,Email,Password,mobile,MostIntersets,Location from user where Email=?`,
        [Email],
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results[0]);
        }
    );
  },

  deleteUser : ( callBack) => {
    /*console.log("from delete : "+currentEmail.PUBLIC_currentLoggedInUserEmail);*/

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

  updateUser : (data, callBack) => {
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
            `update user set UserName=?,Email=?, Password=?, mobile=? ,MostIntersets=?,Location=? where UserId = ?`
            ,[
              data.UserName, 
              data.Email , 
              data.Password ,
              data.mobile , 
              data.MostIntersets ,
              data.Location ,
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
  getUsersBySimilarInterests : (MostIntersets, callBack) => {
    pool.query(
        `select UserName,Email,mobile,MostIntersets,Location from user where 
        MostIntersets like ?`,
        [`%${ MostIntersets }%`] ,
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
        `select UserName,Email,mobile,MostIntersets,Location from user where 
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
        `select Email,mobile,MostIntersets,Location from user where 
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











