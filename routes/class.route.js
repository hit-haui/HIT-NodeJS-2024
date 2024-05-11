const express = require('express');

const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/').post(classController.createClass).get(classController.getAllClass);

classRoute.route('/:classId').get(classController.getClassById).post(classController.updateClassById).delete(classController.deleteClassById);

classRoute.route('/:classId/join').post(classController.joinClass);

classRoute.route('/:classId/leave').delete(classController.leaveClass);

module.exports = classRoute;
