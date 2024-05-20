const httpStatus = require('http-status');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'vui long dien du thong tin!');
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Email da ton tai. Vui long su dung email khac!');
  }

  const user = await User.create({ fullname, email, password });
  return res.status(httpStatus.CREATED).json({
    message: 'Đã tạo người dùng thành công',
    code: httpStatus.CREATED,
    data: {
      user,
    },
  });
});

const getUsers = catchAsync(async (req, res, next) => {
  const { limit, page, sortBy = 'createdAt : desc, fullname: desc' } = req.query;

  const skip = (+page - 1) * +limit;

  const [field, value] = sortBy.split(':');
  const sort = { [field]: value === 'asc' ? 1 : -1 };

  const query = {};

  const users = await User.find().limit(limit).skip(skip).sort(sort);

  const totalResults = await User.countDocuments(query);

  res.json({
    message: 'Lấy thành công mảng người dùng',
    code: httpStatus.OK,
    data: {
      users,
      limit: +limit,
      currentPage: +page,
      totalPage: Math.ceil(totalResults / +limit),
      totalResults,
    },
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `Không tìm thấy người dùng`);
  }

  res.json({
    message: `Lấy thông tin người dùng thành công`,
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const updateBody = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `Không tìm thấy người dùng`);
  }

  Object.assign(user, updateBody);

  await user.save();

  res.json({
    message: `Cập nhật thông tin người dùng thành công`,
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `Không tìm thấy người dùng`);
  }

  res.json({
    message: `Xoá người dùng thành công`,
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

const lockUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `Không tìm thấy người dùng`);
  }

  user.isLocked = !user.isLocked;
  await user.save();

  res.json({
    message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById,
};
