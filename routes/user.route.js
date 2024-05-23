const express = require('express');

const validate = require('../middlewares/validate.middleware');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.route('/').post(validate(userValidation.createUser), userController.createUser).get(validate(userValidation.getUsers), userController.getUsers);

userRoute
  .route('/:userId')
  .get(validate(userValidation.getUserById), userController.getUserById)
  .put(validate(userValidation.updateUser), userController.updateUserById)
  .options(validate(userValidation.lockUserById), userController.lockUserById)
  .delete(validate(userValidation.deleteUserById), userController.deleteUserById);

module.exports = userRoute;
