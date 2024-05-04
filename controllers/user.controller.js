const bcrypt = require('bcrypt');

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


    //kiem tra email da ton tai hay chua
    const user = await User.findOne({ email });

    if (user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Email đã tồn tại! ',
        code: httpStatus.BAD_REQUEST,
      });
    }
    else {
      //hashPassword
      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({ fullname, email, password: hashPassword });

      //tao user tra ve khong co password
      const { password: _, ...user } = newUser.toObject();
      return res.status(httpStatus.CREATED).json({
        message: 'Đã tạo người dùng thành công',
        code: httpStatus.CREATED,
        data: {
          user,
        },
      });
    }
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
    const users = await User.find({}).select("-password");
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
    const user = await User.findById(userId).select("-password");
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
  const { fullname, email, password,  } = req.body;
  try {
    // const hashPassword = bcrypt.hashSync(password, 10);
    // const users = await User.findByIdAndUpdate(userId, { fullname, email, password: hashPassword });

    const users = await User.findById(userId);

    if (!users) {
      res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

    const hashPassword = password ? bcrypt.hashSync(password, 10) : bcrypt.hashSync(users.password, 10);
    let userUpdate = {
      fullname: fullname ? fullname : users.fullname,
      email: email ? email : users.email,
      password: hashPassword,
    }

    await User.updateOne({ _id: userId }, userUpdate);

    const { password: _, ...user } = users.toObject();

    res.json({
      message: `Cập nhật thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã sảy ra lỗi vui lòng thử lại",
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await User.findByIdAndDelete(userId);

    if (!users) {
      res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

    const { password: _, ...user } = users.toObject();

    res.json({
      message: `Xoá người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã sảy ra lỗi vui lòng thử lại",
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const lockUserById = async (req, res) => {

  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

    user.isLocked = !user.isLocked;
    await user.save();

    const { password: _, ...userResult } = user.toObject();

    res.json({
      message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
      code: httpStatus.OK,
      data: {
        user: userResult,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã sảy ra lỗi vui lòng thử lại",
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
