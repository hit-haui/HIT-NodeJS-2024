const express = require('express');

const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/').post(classController.createClass);

classRoute.route('/:classId').get(classController.getClassById).post(classController.updateClassById);

module.exports = classRoute;
