const httpStatus = require('http-status');

const User = require('../models/user.model');

const createUser = async (req, res) => {
  try {
    const {fullname, email, password} = req.body;
    if(!fullname || !email || !password){
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Vui lòng nhập đầy đủ thông tin',
        code: httpStatus.BAD_REQUEST,
      });
    }
    const users = await User.create({fullname, email, password});
    return res.status(httpStatus.CREATED).json({
      message: 'Tạo mới người dùng thành công',
      code: httpStatus.CREATED,
      data: {
        users,
      },
    });
  }catch (error) {
    console(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Có lỗi xảy ra',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const getUsers = async(req, res) => {
  try {
    const users = await User.find({});
    
  }catch(error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Không tìm thấy người dùng',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const getUserById = async(req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.find({});
  }catch (err) {
    console.log(err);
    res.status(httpStatus.NOT_FOUND).json({
      message: `Không tìm thấy người dùng`,
      code: httpStatus.NOT_FOUND,
    });
  }
  const user = User.findById(userId);
  

  res.json({
    message: `Lấy thông tin người dùng thành công`,
    code: httpStatus.OK,
    data: {
      user,
    },
  });
};

const updateUserById = async(req, res) => {
  const { userId } = req.params;
  const { fullname, dateOfBirth, isLocked, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { fullname } , {dateOfBirth} , {isLocked} , {avatar}, { new: true });
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

const deleteUserById = async(req, res) => {
  const { userId } = req.params;
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
