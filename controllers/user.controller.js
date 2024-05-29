const httpStatus = require('http-status');

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res, next) => {
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Email đã tồn tại.');
  }

  const user = await User.create(req.body);
  return res.status(httpStatus.CREATED).json({
    message: 'Tạo mới người dùng thành công',
    code: httpStatus.CREATED,
    data: {
      user,
    },
  });
});

const getUsers = catchAsync(async (req, res, next) => {
  const { limit = 10, page = 1, sortBy = 'createdAt : desc, fullname: desc' } = req.query;

  const skip = (+page - 1) * +limit;

  const [field, value] = sortBy.split(':');
  const sort = { [field]: value === 'asc' ? 1 : -1 };

  const query = {};

  const users = await User.find().limit(limit).skip(skip).sort(sort);

  const totalResults = await User.countDocuments(query);

  res.json({
    message: 'Lấy danh sách người dùng thành công',
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
  const user = await User.findById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `Không tìm thấy người dùng`);
  }

  res.json({
    message: `Thông tin người dùng`,
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  // const updateBody = req.body;

  if (req.file) req.body['avatar'] = req.file.path;

  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `Không tìm thấy người dùng`);
  }

  Object.assign(user, req.body);

  await user.save();

  res.json({
    message: `Cập nhật thông tin người dùng thành công`,
    code: httpStatus.OK,
    data: {
      user,
    },
  });
});

const deleteUserById = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);

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
};

const lockUserById = async (req, res, next) => {
  const user = await User.findById(req.params.userId);

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
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  lockUserById,
  updateUserById,
  deleteUserById,
};
