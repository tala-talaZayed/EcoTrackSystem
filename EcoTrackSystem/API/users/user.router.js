const router = require("express").Router();
const {createUser,deleteCurrentUser,updateCurrentUser,login,logout,//getUsersBySimilarInterests,
    getUsersBySimilarLocation,getUsersByUserName} = require("./user.controller");
          
const {checkToken}= require("../../Authoriaztion/tokenValidation");
router.post("/",createUser);
router.post("/login",login);
router.post("/logout",checkToken,logout);
router.get("/:UserName",checkToken,getUsersByUserName);
router.delete("/",checkToken,deleteCurrentUser);
router.patch("/",checkToken,updateCurrentUser );
router.get("/Interests/",checkToken,getUsersBySimilarInterests);
//router.get("/Interests/:MostIntersets",checkToken,getUsersBySimilarInterests);
router.get("/Location/:Location",checkToken,getUsersBySimilarLocation);
module.exports = router ;

