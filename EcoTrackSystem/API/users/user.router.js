const router = require("express").Router();
const {createUser,deleteCurrentUser,updateCurrentUser,login,logout,
    getUsersBySimilarLocation,getUsersByUserName,addSample,getUserWeather} = require("./user.controller");
const {checkToken}= require("../../Authoriaztion/tokenValidation");
router.post("/",createUser);
router.post("/login",login);
router.post("/logout",checkToken,logout);
router.get("/:UserName",checkToken,getUsersByUserName);
router.delete("/",checkToken,deleteCurrentUser);
router.patch("/",checkToken,updateCurrentUser );
router.get("/Location/:Location",checkToken,getUsersBySimilarLocation);
router.post("/samples",checkToken,addSample);    
router.get("/weather/:city",checkToken, getUserWeather);

module.exports = router ;

