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
/**
 * @swagger
 * /organization:
 *   patch:
 *      description: Update Organization data
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
 *                      minLength: 5
 *                      maxLength: 100
 *                      example: info@irespond.africa
 *                  password:
 *                      type: string
 *                      minLength: 8
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
/**
 * @swagger
 * /delete/organization:
 *   delete:
 *      description: Used to register Oganization/Company
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: body
 *            name: Organization
 *            description: Delete Organization data
 *            schema:
 *              type: parameter
 *              required:
 *                 - organizationId
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.delete('/remove-employee', organizationController.removeEmployee);
/**
 * @swagger
 * /remove-employee:
 *   delete:
 *      description: Remove Employee
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: body
 *            name: Organization
 *            description: Remove Employee From Organization and Lane
 *            schema:
 *              type: object
 *              required:
 *                 - employeeEmail
 *                 - organizationId
 *              properties:
 *                  employeeEmail:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: info@irespond.africa
 *                  organizationId:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '404':
 *              description: resource not found
 *          '400':
 *              description: Bad request
 */
router.get('/organization/employees', organizationController.getAllEmployesss);
/**
 * @swagger
 * /organization/employees:
 *   get:
 *      description: Get All Organization's Employees
 *      tags:
 *          - Organization Employees
 *      parameters:
 *          - in: query
 *            name: Organization Employees
 *            description: Organization employees
 *            schema:
 *              type: params
 *                 - organization_id
 *              properties:
 *                  organization_logo:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *      responses:
 *          '200':
 *              description: Resource retrieve successfully
 *          '500':
 *              description: Bad request
 */
router.patch('/organization/reset-password', organizationController.resetPassword);
/**
 * @swagger
 * /organization/reset-password:
 *   patch:
 *      description: Reset Password for Organization
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: body
 *            name: Organization Password Reset
 *            description: Resetting password
 *            schema:
 *              type: object
 *              required:
 *                 - password
 *              properties:
 *                  password:
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
router.get('/organization/all', organizationController.getAllOrganization);
/**
 * @swagger
 * /organization/all:
 *   get:
 *      description: Get All Organizations
 *      tags:
 *          - Organizations
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get('/organization/enquiry', organizationController.getOrganization);
/**
 * @swagger
 * /organization/enquiry:
 *   get:
 *      description: Get Organization by Id
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: query
 *            name: Organization
 *            description: Organization data
 *            schema:
 *              type: object
 *              required:
 *                 - id
 *              properties:
 *                  id:
 *                      type: string
 *                      example: "6adnhaka79930jkakdnd"
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get('/organization/name', organizationController.getOrganizationByName);
/**
 * @swagger
 * /organization/name:
 *   get:
 *      description: Get Organization by name
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: params
 *            name: Organization
 *            description: Find Organization by name
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: iRespond Africa
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


module.exports = router;