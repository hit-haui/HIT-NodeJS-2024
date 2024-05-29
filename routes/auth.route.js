const express = require('express');

const upload = require("../middlewares/multer.middleware");
const validate = require('../middlewares/validate.middleware');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth.middleware');

const authRoute = express.Router();

authRoute.route('/register').post(validate(authValidation.register), authController.register);
authRoute.route('/login').post(validate(authValidation.login), authController.login);
authRoute.get('/me', auth, authController.getMe);
authRoute.put('/me', auth, upload.single('avatar'), validate(authValidation.updateProfile), authController.updateProfile);

module.exports = authRoute;
