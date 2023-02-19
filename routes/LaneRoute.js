const express = require('express');
const laneController = require('../controller/LaneController');




const router = express.Router();


router.post('/lane', laneController.createLane);


router.patch('/lane/update', laneController.updateLane);

router.delete('/post/delete', laneController.deletePost);

router.get('/post', laneController.getPost);

router.get('/posts/all', laneController.getChats);

router.post('/post', laneController.createPost);

router.get('/', (req, res) =>{
    res.send('Welcome home');
})


module.exports = router;