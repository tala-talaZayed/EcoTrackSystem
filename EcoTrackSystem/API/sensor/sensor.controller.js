const { getAllSensors, addSensor, updateSensor, deleteSensor } = require('./sensor.service');

module.exports = {
  getAllSensors: (req, res) => {
    getAllSensors((err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          error: 'Error while getting the sensors'
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  createSensor: (req, res) => {
    const data = req.body;
    const isAdmin = req.decoded.result.isAdmin || false;
    if(isAdmin ){
    addSensor(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          error: 'Error adding the sensor'
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
    }
    else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
      }
  },

  updateSensor: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const isAdmin = req.decoded.result.isAdmin || false;
    if(isAdmin ){
    updateSensor(id, data, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          error: 'Error updating sensor'
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
    }
    else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
    }
  },

  deleteSensor: (req, res) => {
    const id = req.params.id;
    const isAdmin = req.decoded.result.isAdmin || false;
    if(isAdmin ){
    deleteSensor(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          error: 'Error deleting sensor'
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
    }
    else {
        return res.json({
          success: 0,
          message: "Unauthorized. Only admins can access this resource."
        });
    }
  }
};
