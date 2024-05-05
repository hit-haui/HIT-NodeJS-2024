const express = require('express');

const classController = require('../controllers/class.controller');

const classRoute = express.Router();

classRoute.route('/').post(classController.createClass);

module.exports = classRoute;
