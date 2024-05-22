const express = require('express');

const validate = require("../middlewares/validate.middleware");
const classController = require('../controllers/class.controller');
const classValidation = require("../validations/class.validation");

const classRoute = express.Router();

classRoute.route('/').post(validate(classValidation.createClass), classController.createClass).get(classController.getAllClass);

classRoute
  .route('/:classId')
  .get(classController.getClassById)
  .post(classController.updateClassById)
  .delete(classController.deleteClassById);

classRoute.route('/:classId/join').post(classController.joinClass);

classRoute.route('/:classId/leave').delete(classController.leaveClass);

module.exports = classRoute;
