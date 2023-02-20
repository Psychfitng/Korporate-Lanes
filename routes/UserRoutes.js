const express = require('express');
const userController = require('../controller/UserController');




const router = express.Router();


router.post('/employee', userController.createUser);
/**
 * @swagger
 * /employee:
 *   post:
 *      description: User Creation
 *      tags:
 *          - Employee
 *      parameters:
 *          - in: body
 *            name: Employee Creation for Organization
 *            description: 
 *            schema:
 *              type: object
 *              required:
 *                 - employeeEmail
 *                 - companyId
 *                 - role
 *              properties:
 *                  employeeEmail:
 *                      type: string
 *                  companyId:
 *                      type: string
 *                  role:
 *                      type: string
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

// router.patch('/update-employee', organizationController.updateOrganization);

router.post('/lane/login', userController.login);
/**
 * @swagger
 * /lane/login:
 *   post:
 *      description: Lane Login
 *      tags:
 *          - Employee
 *      parameters:
 *          - in: body
 *            name: Employee
 *            description: Lane Login
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - password
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 5
 *                      maxLength: 100
 *                      example: info@irespond.africa
 *                  password:
 *                      type: string
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


module.exports = router;