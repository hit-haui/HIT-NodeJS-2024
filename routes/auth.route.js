const express = require('express');

const validate = require('../middlewares/validate.middleware');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

const authRoute = express.Router();

authRoute.route('/register').post(validate(authValidation.register), authController.register);
authRoute.route('/login').post(validate(authValidation.login), authController.login);

module.exports = authRoute;
