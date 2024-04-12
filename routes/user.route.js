const express = require('express');
const userRoute = express.Router();

const userController = require('../controllers/user.controller');

userRoute.post('/users', userController.createUser);
userRoute.get('/users', userController.getUsers);
userRoute.get('/users/:userId', userController.getUserById);
userRoute.put('/users/:userId', userController.updateUserById);
userRoute.delete('/users/:userId', userController.deleteUserById);
userRoute.options('/users/:userId', userController.lockUserById);

module.exports = userRoute;
