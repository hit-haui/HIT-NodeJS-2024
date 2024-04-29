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

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
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
    const user = await User.findById(userId);
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
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã sảy ra lỗi vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { fullname } = req.body;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { fullname }, { new: true });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

    res.json({
      message: `Cập nhật thông tin người dùng thành công`,
      code: httpStatus.OK,
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

const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

    res.json({
      message: `Xoá người dùng thành công`,
      code: httpStatus.OK,
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

const lockUserById = async (req, res) => {
  const { userId } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

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

    res.json({
      message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
      code: httpStatus.OK,
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

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  lockUserById,
};
