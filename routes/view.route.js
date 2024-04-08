const express = require('express')
const viewController = require('../controllers/view.controller');
const viewRoute = express.Router();

viewRoute.get('/login', viewController.loginPage);
viewRoute.get('/register', viewController.registerPage);

module.exports = viewRoute;