const express = require('express');

const validate = require('../middlewares/validate.middleware');
const classValidation = require('../validations/class.validation');
const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/')
.post(validate(classValidation.createClass), classController.createClass)
.get(validate(classValidation.getClasses), classController.getAllClass);

classRoute
  .route('/:classId')
  .get(validate(classValidation.getClassById), classController.getClassById)
  .put(validate(classValidation.updateClass), classController.updateClassById)
  .delete(validate(classValidation.deleteClass), classController.deleteClassById);

classRoute.route('/:classId/join').post(validate(classValidation.joinClass), classController.joinClass);

classRoute.route('/:classId/leave').delete(validate(classValidation.leaveClass), classController.leaveClass);

module.exports = classRoute;
