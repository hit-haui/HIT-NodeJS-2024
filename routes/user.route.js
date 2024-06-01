const express = require('express');

const upload = require('../middlewares/multer.middleware');
const validate = require('../middlewares/validate.middleware');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const { auth, author } = require('../middlewares/auth.middleware');

const userRoute = express.Router();

userRoute.use(auth, author(['admin', 'teacher']));

userRoute.route('/').post(validate(userValidation.createUser), userController.createUser).get(userController.getUsers);

userRoute
  .route('/:userId')
  .get(userController.getUserById)
  .put(upload.single('avatar'), validate(userValidation.updateUser), userController.updateUserById)
  .options(userController.lockUserById)
  .delete(userController.deleteUserById);

module.exports = userRoute;
