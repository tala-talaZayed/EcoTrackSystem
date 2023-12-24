const router = require("express").Router();
const {addNewData,getAllData,getDataByGroupName,getDatabyDataName,getDatabyDataId,getDatabySensorId,
    deleteDataById,deleteDataByName,deleteDataByGroupName,updateDataByitsName,updateDataByitsId} = require("./data.controller");
          
const {checkToken}= require("../../Authoriaztion/tokenValidation");
router.post("/",checkToken,addNewData);
router.get("/",checkToken,getAllData);
router.get("/Group/:DataGroup",checkToken,getDataByGroupName);
router.get("/Name/name/:DataName",checkToken,getDatabyDataName);
router.get("/:DataId",checkToken,getDatabyDataId);
router.get("/Sensor/:SensorId",checkToken,getDatabySensorId);
router.delete("/:id",checkToken,deleteDataById);
router.delete("/Name/:name",checkToken,deleteDataByName);
router.delete("/Group/:group",checkToken,deleteDataByGroupName);
router.patch("/Name/:name",checkToken,updateDataByitsName);
router.patch("/:id",checkToken,updateDataByitsId);

module.exports = router ;
