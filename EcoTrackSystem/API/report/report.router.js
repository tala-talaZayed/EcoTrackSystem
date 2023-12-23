const router = require("express").Router();
const {createReport,deleteReport,updateReport,getAllReports  } = require("./report.controller");
          
const {checkToken}= require("../../Authoriaztion/tokenValidation");
router.post("/",checkToken,createReport);
router.delete("/:Title",checkToken,deleteReport);
router.patch("/:Title",checkToken,updateReport );
//admin
router.get("/",checkToken,getAllReports);
module.exports = router ;

