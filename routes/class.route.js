const express = require('express');

const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/')
    .get(classController.getClasses)
    .post(classController.createClass)

classRoute.route('/:classId')
    .get(classController.getClassById)
    .put(classController.updateClassById)

module.exports = classRoute;
