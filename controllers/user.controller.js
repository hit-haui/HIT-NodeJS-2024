const httpStatus = require("http-status");
const User = require("../models/user.model");

const createUser = (req, res) => {
  const { fullname, email } = req.body;

  const users = User.create({ fullname, email, islocked: false });
  res.json({
    message: 'tao moi nguoi dung thanh cong!',
    code: httpStatus.OK,
    data: {
      users,
    }
  });
};

const getUsers = (req, res) => {

  const users = User.findAll();

  const reqQuery = req.query;
  res.json({
    message: "lay thanh cong mang nguoi dung",
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
      message: `khong tim thay nguoi dung co id la ${userId}`,
      code: httpStatus.NOT_FOUND,
    })
  }
  res.json({
    message: `Lấy thông tin người dùng thành công`,
    code: httpStatus.OK,
    data: user,
  });
};

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { fullname } = req.body;
  const users = User.updateById(userId, { fullname });

  if (!users) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `khong tim thay nguoi dung co id la ${userId}`,
      code: httpStatus.NOT_FOUND,
    })
  }

  res.json({
    message: `Cập nhật thông tin người dùng có Id ${userId} thành công`,
    code: httpStatus.OK,
    data: users,
  });
};

const deleteUserById = (req, res) => {
  const { userId } = req.params;
  const users = User.deleteById(userId);

  if (!users) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `khong tim thay nguoi dung co id la ${userId}`,
      code: httpStatus.NOT_FOUND,
    })
  }
  res.json({
    message: `Xoá người dùng  thành công`,
    code: httpStatus.OK,
    data: {
      users
    }
  });
};

const lockUserById = (req, res) => {
  const { userId } = req.params;

  const user = User.lockId(userId);


  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: `khong tim thay nguoi dung co id la ${userId}`,
      code: httpStatus.NOT_FOUND,
    })
  }
  res.json({
    message: user.islocked ? `Khoá người dùng thành công` : `Mo Khoá người dùng thành công`,
    code: httpStatus.OK,
    data: {
      user,
    }
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
