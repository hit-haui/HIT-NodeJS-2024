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
  res.status(httpStatus.CREATED).json({
    message: 'Đăng ký người dùng thành công',
    code: httpStatus.CREATED,
    data: [],
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.isMatchPassword(password))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tài khoản hoặc mật khẩu không chính xác');
  }

  if (user.isLocked) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Tài khoản đã bị khoá');
  }

  user.password = undefined;

  res.status(httpStatus.OK).json({
    message: 'Đăng nhập thành công',
    code: httpStatus.OK,
    data: user,
  });
});

module.exports = {
  login,
  register,
};
