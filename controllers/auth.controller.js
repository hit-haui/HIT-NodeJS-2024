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
  if (req.file) {
    req.body['avatar'] = req.file.path;
  }

  const user = await User.findById(req.user.id);

  const userExist = await User.findOne({ email: req.body.email })
  if (userExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Địa chỉ email đã tồn tại');
  }

  const { fullname, dateOfBirth } = req.body;

  Object.assign(user, { fullname, dateOfBirth });

  await user.save();

  res.status(httpStatus.OK).json({
    message: 'Cập nhật profile thành công',
    code: httpStatus.OK,
    data: [],
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.isMatchPassword(password))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mật khẩu không chính xác');
  }

  user.password = newPassword;

  await user.save();

  res.status(httpStatus.OK).json({
    message: 'Đổi mật khẩu thành công',
    code: httpStatus.OK,
    data: [],
  });
})

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
  changePassword
};
