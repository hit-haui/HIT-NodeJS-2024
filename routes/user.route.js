const express = require('express');

const userController = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.post('/create', userController.createUser);

userRoute.get('/getusers', userController.getUsers);

userRoute.get('/:userId', userController.getUserById);

userRoute.put('/updatebyid/:userId', userController.updateUserById);

userRoute.delete('/deletebyId/:userId', userController.deleteUserById);

userRoute.options('/lockuserbyId/:userId', userController.lockUserById);

module.exports = userRoute;
