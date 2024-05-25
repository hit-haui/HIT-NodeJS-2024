const express = require('express');

const classController = require('../controllers/class.controller');
const classValidate = require('../validations/class.validation');
const validate = require('../middlewares/validate.middleware');
const classRoute = express.Router();

classRoute.route('/')
  .post(validate(classValidate.createClass), classController.createClass)
  .get(validate(classValidate.getClasses), classController.getAllClass);

classRoute
  .route('/:classId')
  .get(validate(classValidate.getClasses),classController.getClassById)
  .post(validate(classValidate.updateClass),classController.updateClassById)
  .delete(validate(classValidate.checkObjectId),classController.deleteClassById);

classRoute.route('/:classId/join').post(validate(classValidate.checkObjectId), classController.joinClass);

classRoute.route('/:classId/leave').delete(validate(classValidate.checkObjectId),classController.leaveClass);

module.exports = classRoute;
