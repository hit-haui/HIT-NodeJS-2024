const jwt = require('jsonwebtoken');
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

  const accessToken = generateToken({ id: user._id });

  res.status(httpStatus.OK).json({
    message: 'Đăng nhập thành công',
    code: httpStatus.OK,
    data: {
      user,
      accessToken,
    },
  });
});

const getMe = async (req, res, next) => {
  res.status(httpStatus.OK).json({
    message: 'Thông tin cá nhân người dùng',
    code: httpStatus.OK,
    data: {
      user: req.user,
    },
  });
};

const updateProfile = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (req.file) {
    user.avatar = req.file.path;
  }

  Object.assign(user, req.body);

  await user.save();

  res.status(httpStatus.OK).json({
    message: 'Cập nhật thông tin cá nhân thành công',
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.isMatchPassword(req.body.oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Mật khẩu cũ không chính xác');
  }

  Object.assign(user, { password: req.body.newPassword });

  await user.save();

  res.status(httpStatus.OK).json({
    message: 'Đổi mật khẩu thành công',
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

module.exports = {
  getMe,
  login,
  register,
  updateProfile,
  changePassword,
};
