const express = require('express');

const validate = require('../middlewares/validate.middleware');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.route('/').post(validate(userValidation.createUser), userController.createUser).get(userController.getUsers);

userRoute
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUserById)
  .put(validate(userValidation.updateUser), userController.updateUserById)
  .options(userController.lockUserById)
  .delete(validate(userValidation.deleteUser), userController.deleteUserById);

module.exports = userRoute;
