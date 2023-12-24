const pool = require ("../../DB/database");

module.exports = {
  getAllSensors: (callBack) => {
    pool.query(
    'SELECT * FROM sensor', 
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  addSensor: (data, callBack) => {
    pool.query(
    'INSERT INTO sensor (SensorName) VALUES (?)', 
    [data.SensorName], 
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  updateSensor: (id, data, callBack) => {
    pool.query('UPDATE sensor SET SensorName = ? WHERE SensorId = ?', 
    [data.SensorName, id], 
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteSensor: (id, callBack) => {
    pool.query('DELETE FROM sensor WHERE SensorId = ?', 
    [id], 
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  }
};
