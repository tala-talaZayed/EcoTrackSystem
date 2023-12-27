const router = require("express").Router();
const {
  addSample,
  deleteSampleById,
  getSamplesByDataId,
  getSamplesByUserId,
  getSamplesBySource,
  getAllSamplesForResearcher,
} = require("./sample.controller");

router.post("/", addSample);
router.delete("/:sampleId", deleteSampleById);
router.get("/data/:dataId", getSamplesByDataId);
router.get("/user/:userId", getSamplesByUserId);
router.get("/source/:source", getSamplesBySource);
router.get("/all/researcher", getAllSamplesForResearcher);

module.exports = router;
