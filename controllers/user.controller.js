const httpStatus = require('http-status');
const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    // tạo mới user đã tồn tại email
    // password => hash (npm i brcrypt)
    // password không được trả về kèm response
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Vui lòng điền đầy đủ thông tin',
        code: httpStatus.BAD_REQUEST,
      });
    }
    const user = await User.create({ fullname, email, password });
    return res.status(httpStatus.CREATED).json({
      message: 'Đã tạo người dùng thành công',
      code: httpStatus.CREATED,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã sảy ra lỗi vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
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
