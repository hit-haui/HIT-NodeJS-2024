const express = require('express');

const userController = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.post('/api/v1/users', userController.createUser);
userRoute.get('/api/v1/users', userController.getUser);
userRoute.get('/api/v1/users/:userId', userController.getUserById);
userRoute.put('/api/v1/users/:userId', userController.upDateUserById);
userRoute.delete('/api/v1/users/:userId', userController.deleteUserById);
userRoute.options('/api/v1/users/:userId', userController.lockUserById);


module.exports = userRoute;
