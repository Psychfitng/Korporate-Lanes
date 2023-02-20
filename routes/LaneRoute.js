const express = require('express');
const laneController = require('../controller/LaneController');

const router = express.Router();


router.post('/lane', laneController.createLane);
/**
 * @swagger
 * /lane:
 *   post:
 *      description: Get All Organization's Employees
 *      tags:
 *          - Lane
 *      parameters:
 *          - in: query
 *            name: companyId
 *            required:
 *              - companyId
 *            description: Create a Lane for Organization
 *      responses:
 *          '200':
 *              description: Resource Created successfully
 *          '500':
 *              description: Bad request
 */
router.patch('/lane/update', laneController.updateLane);

router.delete('/chat/delete', laneController.deletePost);
/**
 * @swagger
 * /chat/delete:
 *   delete:
 *      description: Delete chat
 *      tags:
 *          - Lane
 *      parameters:
 *          - in: query
 *            name: chatId
 *            required:
 *              - chatId
 *            description: Remove chat from the lane
 *      responses:
 *          '200':
 *              description: Resource retrieve successfully
 *          '500':
 *              description: Bad request
 */

router.get('/chat', laneController.getPost);
/**
 * @swagger
 * /chat:
 *   get:
 *      description: Get a specific chat
 *      tags:
 *          - Lane
 *      parameters:
 *          - in: query
 *            name: chatId
 *            required:
 *              - chatId
 *      responses:
 *          '200':
 *              description: Resource retrieve successfully
 *          '500':
 *              description: Bad request
 */

router.get('/chat/all', laneController.getChats);
/**
 * @swagger
 * /chat/all:
 *   get:
 *      description: Get All Chats in a lane
 *      tags:
 *          - Lane
 *      parameters:
 *          - in: query
 *            name: name
 *            required:
 *              - name
 *            description: Name of lane to fetch the chat
 *      responses:
 *          '200':
 *              description: Resource retrieve successfully
 *          '500':
 *              description: Bad request
 */

router.post('/chat/create', laneController.createPost);
/**
 * @swagger
 * /chat/create:
 *   post:
 *      description: Lane Creation
 *      tags:
 *          - Lane
 *      parameters:
 *          - in: body
 *            name: Lane for Organization
 *            description: 
 *            schema:
 *              type: object
 *              required:
 *                 - content
 *                 - imageUrl
 *                 - userId
 *                 - laneId
 *              properties:
 *                  content:
 *                      type: string
 *                  imageUrl:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  laneId:
 *                      type: string
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/', (req, res) =>{
    res.send('Welcome home');
})

router.patch('/chat/update', laneController.updatePost);
/**
 * @swagger
 * /chat/update:
 *   post:
 *      description: Chat update
 *      tags:
 *          - Lane
 *      parameters:
 *          - in: body
 *            name: Chat update
 *            description: 
 *            schema:
 *              type: object
 *              required:
 *                 - content
 *                 - imageUrl
 *                 - userId
 *                 - laneId
 *              properties:
 *                  content:
 *                      type: string
 *                  imageUrl:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  laneId:
 *                      type: string
 *          - in: query
 *            name: chatId
 *            required:
 *              - chatId 
 *      responses:
 *          '200':
 *              description: Resource updated successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

module.exports = router;