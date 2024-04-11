const express = require("express");
const viewRoute = express.Router();

const viewController = require("../controllers/view.controller");

viewRoute.get('/login', viewController.loginPage);

viewRoute.get('/register', viewController.registerPage);

module.exports = viewRoute;
