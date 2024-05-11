const validator = require('validator');

const ApiError = require('../utils/ApiError');

const createUser = (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!validator.isLength(fullname, { min: 5, max: 25 })) {
    next(new ApiError('Họ và tên cần dài từ 5 đến 25 ký tự'));
  }

  if (!validator.isEmail(email, { min: 5, max: 25 })) {
    next(new ApiError('Vui lòng điền đầy đủ email'));
  }

  if (!validator.isStrongPassword(password)) {
    next(new ApiError('Vui lòng điền đầy đủ mật khẩu'));
  }

  next();
};

module.exports = {
  createUser,
};
