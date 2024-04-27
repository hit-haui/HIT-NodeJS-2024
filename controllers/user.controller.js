const httpStatus = require('http-status');
const User = require('../models/user.model');

const createUser = (req, res) => {
  const { fullname, email } = req.body;
  const users = User.create({ fullname, email, isLocked: false });
  res.status(httpStatus.CREATED).json({
    message: 'Tạo mới người dùng thành',
    code: httpStatus.CREATED,
    data: {
      users,
    },
  });
};

const getUsers = (req, res) => {
  const users = User.findAll();
  res.json({
    message: 'Lấy thành công mảng người dùng',
    code: httpStatus.OK,
    data: {
      users,
    },
  });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const user = User.findById(userId);
  if (!user) {
    res.status(httpStatus.NOT_FOUND).json({
      message: `Không tìm thấy người dùng`,
      code: httpStatus.NOT_FOUND,
    });
  }

  res.json({
    message: `Lấy thông tin người dùng thành công`,
    code: httpStatus.OK,
    data: {
      user,
    },
  });
};

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { fullname } = req.body;
  const users = User.updateById(userId, { fullname });
  if (!users) {
    res.status(httpStatus.NOT_FOUND).json({
      message: `Không tìm thấy người dùng`,
      code: httpStatus.NOT_FOUND,
    });
  }
  res.json({
    message: `Cập nhật thông tin người dùng thành công`,
    code: httpStatus.OK,
    data: {
      users,
    },
  });
};

const deleteUserById = (req, res) => {
  const { userId } = req.params;
  const users = User.deleteById(userId);
  if (!users) {
    res.status(httpStatus.NOT_FOUND).json({
      message: `Không tìm thấy người dùng`,
      code: httpStatus.NOT_FOUND,
    });
  }
  res.json({
    message: `Xoá người dùng thành công`,
    code: httpStatus.OK,
    data: {
      users,
    },
  });
};

const lockUserById = (req, res) => {
  const { userId } = req.params;
  const user = User.lockById(userId);
  if (!user) {
    res.status(httpStatus.NOT_FOUND).json({
      message: `Không tìm thấy người dùng`,
      code: httpStatus.NOT_FOUND,
    });
  }
  res.json({
    message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
    code: httpStatus.OK,
    data: {
      user,
    },
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById,
};
