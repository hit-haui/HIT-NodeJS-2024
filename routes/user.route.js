const express = require('express');
const userRoute = express.Router();

const userController = require('../controllers/user.controller');

userRoute.post('/', userController.createUser);
userRoute.get('/', userController.getUsers);
userRoute.get('/:userId', userController.getUserById);
userRoute.put('/:userId', userController.updateUserById);
userRoute.delete('/:userId', userController.deleteUserById);
userRoute.options('/:userId', userController.lockUserById);

module.exports = userRoute;
