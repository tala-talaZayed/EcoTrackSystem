const {
    addSample,
    deleteSampleById,
    getSamplesByDataId,
    getSamplesByUserId,
    getSamplesBySource,
    getAllSamplesForResearcher,
  } = require("./sample.service");
  
  module.exports = {
    addSample: (req, res) => {
      const body = req.body;
      addSample(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error!",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
  
    deleteSampleById: (req, res) => {
      const sampleId = req.params.sampleId;
      deleteSampleById(sampleId, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error!",
          });
        }
        return res.status(200).json({
          success: 1,
          message: "Sample deleted successfully",
        });
      });
    },
  
    getSamplesByDataId: (req, res) => {
      const dataId = req.params.dataId;
      getSamplesByDataId(dataId, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error!",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
  
    getSamplesByUserId: (req, res) => {
      const userId = req.params.userId;
      getSamplesByUserId(userId, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error!",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
  
    getSamplesBySource: (req, res) => {
      const source = req.params.source;
      getSamplesBySource(source, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error!",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
  
    getAllSamplesForResearcher: (req, res) => {
      getAllSamplesForResearcher((err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error!",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
  };
  