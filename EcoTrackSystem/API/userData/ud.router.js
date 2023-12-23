const router = require("express").Router();
const {addNewDataInterest,deleteDataInterest,getTheCurrentUserIntrest,getSpecificDataThresholdforCurrentUser
    ,updateSpecificDataThresholdforCurrentUser} = require("./ud.controller");
          
const {checkToken}= require("../../Authoriaztion/tokenValidation");
router.post("/",checkToken,addNewDataInterest);
router.delete("/:dataId",checkToken,deleteDataInterest);
router.get("/",checkToken,getTheCurrentUserIntrest);
router.get("/Threshold/:dataId",checkToken,getSpecificDataThresholdforCurrentUser);
router.patch("/",checkToken,updateSpecificDataThresholdforCurrentUser );

module.exports = router ;

