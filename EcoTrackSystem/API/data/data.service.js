const pool = require ("../../DB/database");//import
const  datacon = require('./data.controller');

module.exports = {
  //create will recive data from controoler and will callback
  addNewData:(data,callBlack)=> {    
  //  console.log(data);
    pool.query( 
        //for query function pass three values 1.query 2.values from user 3.callback 
       // 'INSERT INTO data (DataGroup, DataName, SensorId) VALUES (?, ?, ?)'
        `INSERT INTO ecodata (DataGroup, DataName, SensorId) VALUES (?, ?, ?)` , 
        //the values from user
        [
           // data.UserId ,
            data.DataGroup,
            data.DataName ,
            data.SensorId
        ],

        (error , results , fields)=>{
            if (error){
              return  callBlack(error)
            }
              return callBlack(null, results)
        }
    );
  } ,
  getAllData : (callBack) => {
    pool.query(
        `select * from ecodata`,
        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
        }
    );
  },
  getDataByGroupName: (DataGroup, callBack) => {
   // console.log(DataGroup);
    pool.query(  
        `SELECT ecodata.DataId, ecodata.DataName,ecodata.DataGroup,sensor.SensorName
        FROM ecodata
        INNER JOIN sensor ON ecodata.SensorId = sensor.SensorId
        WHERE ecodata.DataGroup like ?`,
        [`%${DataGroup}%`] ,

        (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
        }
    );
  },
  getDatabyDataName: (DataName, callBack) => {
    // console.log(DataGroup);
     pool.query(  
         `SELECT ecodata.DataId,ecodata.DataGroup,sensor.SensorName
         FROM ecodata
         INNER JOIN sensor ON ecodata.SensorId = sensor.SensorId
         WHERE ecodata.DataName like ?`,
         [`%${DataName}%`] ,
 
         (error, results, fields) => {
             if (error) {
              return callBack(error);
             }
             return callBack(null, results);
         }
     );
   },
   getDatabyDataId: (DataId, callBack) => {
    // console.log(DataGroup);
     pool.query(  
         `SELECT ecodata.DataName,ecodata.DataGroup,sensor.SensorName
         FROM ecodata
         INNER JOIN sensor ON ecodata.SensorId = sensor.SensorId
         WHERE ecodata.DataId = ?`,
         [DataId] ,
 
         (error, results, fields) => {
             if (error) {
              return callBack(error);
             }
             return callBack(null, results);
         }
     );
   },
   getDatabySensorId: (SensorId, callBack) => {
    //console.log(SensorId);
     pool.query(  
         `SELECT sensor.SensorName,ecodata.DataId,ecodata.DataName,ecodata.DataGroup
         FROM ecodata
         INNER JOIN sensor ON ecodata.SensorId = sensor.SensorId
         WHERE ecodata.SensorId = ?`,
         [SensorId] ,
 
         (error, results, fields) => {
             if (error) {
              return callBack(error);
             }
             return callBack(null, results);
         }
     );
   },
   deleteDataById : ( DataId,callBack) => {
    pool.query(
      `delete from ecoData where DataId = ?`,
      [DataId],
      (error, results, fields) => {
          if (error) {
           return callBack(error);
          }
          return callBack(null, results);
      } 
  )
  },
  deleteDataByName : ( DataName,callBack) => {
    pool.query(
      `delete from ecoData where DataName like ?`,
      [`%${DataName}%`] ,
      (error, results, fields) => {
          if (error) {
           return callBack(error);
          }
          return callBack(null, results);
      } 
  )
  },

  deleteDataByGroupName:( DataGroup,callBack) => {
    pool.query(
      `delete from ecoData where DataGroup like ?`,
      [`%${DataGroup}%`] ,
      (error, results, fields) => {
          if (error) {
           return callBack(error);
          }
          return callBack(null, results);
      } 
  )
  },
  updateDataByitsName: (DataName, data, callBack) => {
    pool.query(
      `update ecodata set DataName=?,DataGroup=?,SensorId=? where DataName like ?`
      ,[
        data.DataName,
        data.DataGroup, 
        data.SensorId , 
        `%${DataName}%`
      ],
      (error, results, fields) => {
          if (error) {
           return callBack(error);
          }
          return callBack(null, results);
      } 
  );
  }, 
  updateDataByitsId: (DataId, data, callBack) => {
    pool.query(
      `update ecodata set DataName=?,DataGroup=?,SensorId=? where DataId=?`
      ,[
        data.DataName,
        data.DataGroup, 
        data.SensorId , 
        DataId
      ],
      (error, results, fields) => {
          if (error) {
           return callBack(error);
          }
          return callBack(null, results);
      } 
  );
  } , 
};
/* UPDATE `ecodata` SET `DataGroup` = 'Air Qualit' WHERE `ecodata`.`DataId` = 1000 */

/*`select DataId,DataGroup,DataName from ecodata where 
        DataGroup like ?`,
        [`%${DataGroup}%`] ,*/








