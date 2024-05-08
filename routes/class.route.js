const express = require('express');

const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/').post(classController.createClass).get(classController.getClasses);

classRoute
  .route('/:classId')
  .get(classController.getClassById)
  .put(classController.updateClassById)
  .delete(classController.deleteClassById);

classRoute.route('/:classId/join').post(classController.joinClass);

classRoute.route('/:classId/leave').post(classController.leaveClass);

module.exports = classRoute;