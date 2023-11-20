const router = require("express").Router();
const {createUser,getUsers,getUserByEmail,deleteUser,
    updateUser,login,getUsersBySimilarInterests,
    getUsersBySimilarLocation,
    getUsersByUserName} = require("./user.controller");      
const {checkToken}= require("../../Authoriaztion/tokenValidation");
router.post("/",createUser);
router.post("/login",login);
router.get("/",checkToken,/*checkToken,*/getUsers);
router.get("/Email/:Email",getUserByEmail);
router.get("/:UserName",getUsersByUserName);
//for current user 
router.delete("/",/*checkToken,*/deleteUser);
router.patch("/",/*checkToken,*/updateUser );
//for current user ^
router.get("/Interests/:MostIntersets",/*checkToken,*/getUsersBySimilarInterests);
router.get("/Location/:Location",/*checkToken,*/getUsersBySimilarLocation);
module.exports = router ;

