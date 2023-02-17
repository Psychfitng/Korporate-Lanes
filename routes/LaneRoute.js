const express = require('express');
const laneController = require('../controller/LaneController');




const router = express.Router();


router.post('/lane', laneController.createLane);

router.patch('/lane/update', laneController.updateLane);

// router.post('/lane/login', laneController.login);


module.exports = router;