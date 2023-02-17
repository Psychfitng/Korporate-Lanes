const express = require('express');
const userController = require('../controller/UserController');




const router = express.Router();


router.post('/employee', userController.createUser);

// router.patch('/update-employee', organizationController.updateOrganization);

router.post('/lane/login', userController.login);


module.exports = router;