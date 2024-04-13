const httpStatus = require('http-status');
const User = require('../models/user.model');

const createUser = (req, res) => {
  const {fullname, email} = req.body;
  const user = User.create({fullname, email, isLocked: false});  
  res.json({
    message: 'Tạo người dùng mới',
    code: httpStatus.OK,
    data:{
      user
    }
  });
}

const getUsers = (req, res) => {
  const users = User.findAll();
  const reqQuery = req.query;
  res.json({
    users: [],
    queries: reqQuery,
    data: {
      users
    }
  });
}

const getUserById = (req, res) => {
  const { userId } = req.params;
  const user = User.findId(userId);
  if(!user){
    res.status(httpStatus.NOT_FOUND).json({
      message: `Lấy thông tin người dùng không thành công`,
      code: httpStatus.NOT_FOUND
    })
  }
  res.json({
    message: `Lấy thông tin người dùng thành công`,
    data:{
      user
    }
  });
}

const updateUserById = (req, res) => {
  const { userId } = req.params;
  const { fullname } = req.body;
  const users = User.updateById(userId, fullname);
  if(!users){
    res.status(httpStatus.NOT_FOUND).json({
      message: `Lấy thông tin người dùng không thành công`,
      code: httpStatus.NOT_FOUND
    })
  }
  res.json({
    message: `Cập nhật thông tin người dùng thành công`,
    data:{
      users
    }
  });
}

const deleteUserById = (req, res) => {
  const { userId } = req.params;
  const users = User.deleteById(+userId);
  if(!users){
    res.status(httpStatus.NOT_FOUND).json({
      message: `Lấy thông tin người dùng không thành công`,
      code: httpStatus.NOT_FOUND
    })
  }
  res.json({
    message: `Xoá người dùng thành công`,
    data: {
      users
    }
  });
}

const lockUserById = (req, res) => {
  const { userId } = req.params;
  const user = User.lockById(userId);
  if(!user){
    res.status(httpStatus.NOT_FOUND).json({
      message: `Lấy thông tin người dùng không thành công`,
      code: httpStatus.NOT_FOUND
    })
  }
  res.json({
    message: user.islocked ? `Khoá người dùng thành công`:'Mở khóa thành công',
    data:{
      user
    }
  });
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById
}
