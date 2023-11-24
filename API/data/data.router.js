const router = require("express").Router();
const {addNewData,getAllData,getDataByGroupName,getDatabyDataName,getDatabyDataId,getDatabySensorId,
    deleteDataById,deleteDataByName,deleteDataByGroupName,updateDataByitsName,updateDataByitsId} = require("./data.controller");
          
const {checkToken}= require("../../Authoriaztion/tokenValidation");
router.post("/addNewData",addNewData);
router.get("/PrintAllData",getAllData);
router.get("/DataGroup/:DataGroup",getDataByGroupName);
router.get("/DataName/:DataName",getDatabyDataName);
router.get("/DataId/:DataId",getDatabyDataId);
router.get("/SensorId/:SensorId",getDatabySensorId);
router.delete("/id/:id",deleteDataById);
router.delete("/name/:name",deleteDataByName);
router.delete("/group/:group",deleteDataByGroupName);
router.patch("/name/:name",updateDataByitsName);
router.patch("/id/:id",updateDataByitsId);

module.exports = router ;
