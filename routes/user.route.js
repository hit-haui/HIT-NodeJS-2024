const express = require('express');

const userController = require('../controllers/user.controller');

const userRoute = express.Router();

// userRoute.post('/', userController.createUser);

// userRoute.get('/', userController.getUsers);

userRoute.route('/').post(userController.createUser).get(userController.getUsers);

userRoute
<<<<<<< HEAD
    .route('/:userId')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)
    .options(userController.lockUserById);
=======
  .route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .options(userController.lockUserById)
  .delete(userController.deleteUserById);
>>>>>>> cce3895b839e12105af31622b5ab626629b0d96a

// userRoute.get('/:userId', userController.getUserById);

// userRoute.put('/:userId', userController.updateUserById);

// userRoute.delete('/:userId', userController.deleteUserById);

// userRoute.options('/:userId', userController.lockUserById);

module.exports = userRoute;
