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
 * /organization/update:
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
 *          - in: path
 *            required:
 *              - id
 *            name: id
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
 *      description: Used to delete Oganization/Company
 *      tags:
 *          - Organization
 *      parameters:
 *          - in: query
 *            name: organizationId
 *            required:
 *              - organizationId
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
 *      responses:
 *          '200':
 *              description: Resource deleted successfully
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
 *          - Organization
 *      parameters:
 *          - in: query
 *            name: organization_id
 *            required:
 *              - organization_id
 *            description: List of all employees added by an Organization
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
 *                 - new_password
 *                 - id
 *              properties:
 *                  new_password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                  id:
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
 *          - Organization
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
 *            name: id
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
 *          - in: query
 *            name: name
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


module.exports = router;