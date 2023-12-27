const pool = require("../../DB/database");

module.exports = {
  addSample: (data, callBack) => {
    pool.query(
      `INSERT INTO sample(sampleId, dataId, userId, source, value) VALUES (?, ?, ?, ?, ?)`,
      [data.sampleId, data.dataId, data.userId, data.source, data.value],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteSampleById: (sampleId, callBack) => {
    pool.query(
      `DELETE FROM sample WHERE sampleId = ?`,
      [sampleId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getSamplesByDataId: (dataId, callBack) => {
    pool.query(
      `SELECT sampleId, dataId, userId, source, value FROM sample WHERE dataId = ?`,
      [dataId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getSamplesByUserId: (userId, callBack) => {
    pool.query(
      `SELECT sampleId, dataId, userId, source, value FROM sample WHERE userId = ?`,
      [userId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getSamplesBySource: (source, callBack) => {
    pool.query(
      `SELECT sampleId, dataId, userId, source, value FROM sample WHERE source = ?`,
      [source],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllSamplesForResearcher: (callBack) => {
    pool.query(
      `SELECT sampleId, dataId, userId, source, value FROM sample`,
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
