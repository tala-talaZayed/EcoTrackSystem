const {addNewData, getAllData,getDataByGroupName,getDatabyDataName,getDatabyDataId, getDatabySensorId,
  deleteDataById,deleteDataByName,deleteDataByGroupName, updateDataByitsName,updateDataByitsId} = require("./data.service");
  //const { sign } = require("jsonwebtoken");

  
  module.exports = {
     addNewData: (req,res)=>{
          const body = req.body ;  
          const isAdmin = req.decoded.result.isAdmin || false;
          if(isAdmin ){
         // console.log(req.body);  
          addNewData(body , (err,results)=>{
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
        }
        else {
          return res.json({
            success: 0,
            message: "Unauthorized. Only admins can access this resource."
          });
        }
      },

      getAllData: (req, res) => {
        getAllData((err, results) => {
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
      getDataByGroupName: (req, res) => {
        const DataGroup= req.params.DataGroup ;
        getDataByGroupName(DataGroup , (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results ||results.length === 0 ) {
            return res.json({
              success: 0,
              message: "There are no such Data Group with this name in the system !"
            });
          }
          return res.json({
            success: 1,
            data: results
          });
        });
      } ,
      getDatabyDataName: (req, res) => {
        const DataName= req.params.DataName;
        getDatabyDataName(DataName , (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results ||results.length === 0 ) {
            return res.json({
              success: 0,
              message: "There is no such Data with this name in the system !"
            });
          }
          return res.json({
            success: 1,
            data: results
          });
        });
      } ,
      getDatabyDataId: (req, res) => {
        const DataId= req.params.DataId;
        console.log(DataId);  
        getDatabyDataId(DataId , (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(results);  
          if (!results ||results.length === 0 ) {
            return res.json({
              success: 0,
              message: "There is no such Data with this ID in the system !"
            });
          }
          return res.json({
            success: 1,
            data: results
          });
        });
      } ,
      getDatabySensorId: (req, res) => {
        const SensorId= req.params.SensorId;
      //  console.log(SensorId);  
        getDatabySensorId(SensorId , (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          //console.log(results);  
          if (!results ||results.length === 0 ) {
            return res.json({
              success: 0,
              message: "There is no such Data using this sensor in the system !"
            });
          }
          return res.json({
            success: 1,
            data: results
          });
        });
      } ,
      deleteDataById : (req, res) => {
        const DataId= req.params.id;
        const isAdmin = req.decoded.result.isAdmin || false;
        if(isAdmin ){
        deleteDataById(DataId,(err, results) =>{
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
      } 
      else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
      }
      },
      deleteDataByName : (req, res) => {
        const DataName= req.params.name;
        const isAdmin = req.decoded.result.isAdmin || false;
        if(isAdmin ){
        deleteDataByName(DataName,(err, results) =>{
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
      }
      else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
      }
      },
      deleteDataByGroupName : (req, res) => {
        const DataGroup= req.params.group;
        const isAdmin = req.decoded.result.isAdmin || false;
        if(isAdmin ){
        deleteDataByGroupName(DataGroup,(err, results) =>{
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
      }
      else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
      }
      },
      updateDataByitsName: (req, res) => {
        const body = req.body ; 
        const DataName = req.params.name;
        const isAdmin = req.decoded.result.isAdmin || false;
        if(isAdmin ){
        updateDataByitsName( DataName, body , (err, results) =>{
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
      }
      else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
      }
      },
      updateDataByitsId: (req, res) => {
        const body = req.body ; 
        const DataId = req.params.id;
        const isAdmin = req.decoded.result.isAdmin || false;
        if(isAdmin ){
        updateDataByitsId( DataId, body , (err, results) =>{
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
      }
      else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
      }
  }
  }


