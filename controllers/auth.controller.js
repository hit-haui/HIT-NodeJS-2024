const httpStatus = require('http-status');
// const bcrypt = require("bcrypt");

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');


const register = catchAsync(async (req, res, next) => {

  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Email da ton tai. Vui long su dung email khac!');
  }

  await User.create(req.body);
  return res.status(httpStatus.CREATED).json({
    message: 'Đã tạo người dùng thành công',
    code: httpStatus.CREATED,
    data: [],
  });
});


const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  if (!user || !(await user.isMatchPassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email hoac password khong dung!');
  }

  // const isMatchPassword = bcrypt.compareSync(password, user.password);

  // const isMatchPassword = await user.isMatchPassword(password);

  // if (!isMatchPassword) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Email hoac password khong dung!');
  // }


  if (user.isLocked) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'tai khoan da bi khoa!');
  }
  user.password = null;
  return res.status(httpStatus.CREATED).json({
    message: 'Dang nhap thanh cong!',
    code: httpStatus.OK,
    data: {
      user,
    },
  });
})

module.exports = {
  register,
  login
};