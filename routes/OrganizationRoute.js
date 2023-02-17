const express = require('express');
const organizationController = require('../controller/OrganizationController');




const router = express.Router();


router.post('/organization', organizationController.createOrganization);
/**
 * @swagger
 * /organization:
 *   post:
 *      description: Used to register Oganization/Company
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: body
 *            name: Organization
 *            description: Organization data
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - user_name
 *                 - email
 *                 - password
 *                 - organization_logo
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: iRespond Africa
 *                  user_name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: IRPA
 *                  email:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: info@irespond.africa
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                  organization_logo:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.patch('/organization/update', organizationController.updateOrganization);

router.post('/organization/login', organizationController.login);
/**
 * @swagger
 * /organization/login:
 *   post:
 *      description: Organization Login
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: body
 *            name: Organization
 *            description: Organization data
 *            schema:
 *              type: object
 *              required:
 *                 - email
 *                 - password
 *              properties:
 *                  email:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: info@irespond.africa
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *      responses:
 *          '200':
 *              description: Resource found successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.delete('/delete/organization', organizationController.deleteOrganization);

router.delete('/remove-employee', organizationController.removeEmployee);

router.get('/organization/employees', organizationController.getAllEmployesss);

router.patch('/organization/reset-password', organizationController.resetPassword);

router.get('/organizations', organizationController.getAllOrganization);

router.get('/organization/enquiry', organizationController.getOrganization);

router.get('/organization/name', organizationController.getOrganizationByName);



module.exports = router;