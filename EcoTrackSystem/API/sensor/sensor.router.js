const router = require("express").Router();
const {getAllSensors,createSensor,updateSensor,deleteSensor} = require('./sensor.controller');
const {checkToken}= require("../../Authoriaztion/tokenValidation");

router.get('/', checkToken, getAllSensors);
router.post('/', checkToken, createSensor);
router.patch('/:id', checkToken, updateSensor);
router.delete('/:id', checkToken, deleteSensor);

module.exports = router;
