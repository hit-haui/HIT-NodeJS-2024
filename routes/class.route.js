const express = require('express');

const validate = require('../middlewares/validate.middleware');
const classController = require('../controllers/class.controller');
const classValidation = require('../validations/class.validation');

const classRoute = express.Router();

classRoute.route('/').post(validate(classValidation.createClass), classController.createClass).get(validate(classValidation.getAllClass), classController.getAllClass);

classRoute
  .route('/:classId')
  .get(validate(classValidation.getClassById), classController.getClassById)
  .post(validate(classValidation.updateClassById), classController.updateClassById)
  .delete(validate(classValidation.deleteClassById), classController.deleteClassById);

classRoute.route('/:classId/join').post(validate(classValidation.joinClass), classController.joinClass);

classRoute.route('/:classId/leave').delete(validate(classValidation.leaveClass), classController.leaveClass);

module.exports = classRoute;
