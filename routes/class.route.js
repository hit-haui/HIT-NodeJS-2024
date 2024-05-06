const express = require('express');

const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/').post(classController.createClass).get(classController.getClasses);

classRoute.route('/:classId').get(classController.getClassById);

module.exports = classRoute;
