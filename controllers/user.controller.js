const httpStatus = require('http-status');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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
    const userFind = await User.findOne({ email: email });
    if (userFind) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Email đã tồn tại',
        code: httpStatus.BAD_REQUEST,
      });
    }
    bcrypt.hash(password, 10, async function (err, hashPassword) {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Có lỗi khi mã hóa mật khẩu',
          code: httpStatus.BAD_REQUEST,
        });
      }
      else {
        const user = await User.create({ fullname, email, password: hashPassword });
        user.password = undefined;
        return res.status(httpStatus.CREATED).json({
          message: 'Đã tạo người dùng thành công',
          code: httpStatus.CREATED,
          data: {
            user,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã sảy ra lỗi vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json({
      message: 'Lấy thành công mảng người dùng',
      code: httpStatus.OK,
      data: {
        users: users,
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

const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }
    return res.json({
      message: `Lấy thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã sảy ra lỗi vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { fullname, dateOfBirth, isLocked, avatar } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }
    user.set({
      fullname,
      dateOfBirth,
      isLocked,
      avatar
    })
    await user.save();
    user.password = undefined;
    return res.json({
      message: `Cập nhật thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Có lỗi xảy ra khi cập nhật thông tin user`,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }
    user.password = undefined;
    res.json({
      message: `Xoá người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  }
  catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Có lỗi xảy ra khi xóa user`,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

const lockUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }
    user.isLocked = !user.isLocked;
    await user.save();
    user.password = undefined;
    res.json({
      message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
      code: httpStatus.OK,
      data: {
        user
      },
    });
  }
  catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Có lỗi xảy ra khi khóa user`,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById,
};
