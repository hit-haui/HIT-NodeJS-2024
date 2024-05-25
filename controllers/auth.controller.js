const httpStatus = require('http-status');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res, next) => {
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Địa chỉ email đã tồn tại');
  }

  await User.create(req.body);
  /// TODO: send email
  return res.status(httpStatus.CREATED).json({
    message: 'Đăng ký người dùng thành công',
    code: httpStatus.CREATED,
    data: [],
  });
});

module.exports = {
  register,
};
