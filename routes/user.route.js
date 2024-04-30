const express = require('express');

const userController = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.route('/').post(userController.createUser).get(userController.getUsers);

userRoute
  .route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .options(userController.lockUserById)
  .delete(userController.deleteUserById);

module.exports = userRoute;
