const express = require("express");

const viewController = require('../controllers/view.controller');

const viewRouter = express.Router();

viewRouter.get('/login', viewController.loginPage);

viewRouter.get('/register', viewController.registerPage);

module.exports = viewRouter;