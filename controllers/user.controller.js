const bcrypt = require('bcrypt');

const httpStatus = require('http-status');

const User = require('../models/user.model');
<<<<<<< HEAD
const {checkIdMongo} = require('../utils/check-Id-Mongo');
=======
const checkIdMongo = require('../utils/check-id-mongo');
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb

const createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Vui lòng điền đầy đủ thông tin',
        code: httpStatus.BAD_REQUEST,
      });
    }

<<<<<<< HEAD

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
=======
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(httpStatus.CONFLICT).json({
        message: 'Email đã tồn tại. Vui lòng sử dụng email khác.',
        code: httpStatus.CONFLICT,
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
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui lòng thử lại',
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
      message: 'Đã xảy ra lỗi vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!checkIdMongo(userId)) {
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
      message: 'Đã xảy ra lỗi vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
<<<<<<< HEAD
  const { fullname, email, password,  } = req.body;
  try {
    // const hashPassword = bcrypt.hashSync(password, 10);
    // const users = await User.findByIdAndUpdate(userId, { fullname, email, password: hashPassword });

    const users = await User.findById(userId);

    if (!users) {
      res.status(httpStatus.NOT_FOUND).json({
=======
  const updateBody = req.body;

  if (!checkIdMongo(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

<<<<<<< HEAD
    const hashPassword = password ? bcrypt.hashSync(password, 10) : bcrypt.hashSync(users.password, 10);
    let userUpdate = {
      fullname: fullname ? fullname : users.fullname,
      email: email ? email : users.email,
      password: hashPassword,
    }

    await User.updateOne({ _id: userId }, userUpdate);

    const { password: _, ...user } = users.toObject();
=======
    Object.assign(user, updateBody);

    await user.save();
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb

    res.json({
      message: `Cập nhật thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
<<<<<<< HEAD
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã sảy ra lỗi vui lòng thử lại",
=======
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui lòng thử lại',
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;
<<<<<<< HEAD
  try {
    const users = await User.findByIdAndDelete(userId);

    if (!users) {
      res.status(httpStatus.NOT_FOUND).json({
=======

  if (!checkIdMongo(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

<<<<<<< HEAD
    const { password: _, ...user } = users.toObject();

=======
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
    res.json({
      message: `Xoá người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
<<<<<<< HEAD
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã sảy ra lỗi vui lòng thử lại",
=======
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui lòng thử lại',
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const lockUserById = async (req, res) => {
<<<<<<< HEAD

  const { userId } = req.params;
=======
  const { userId } = req.params;

  if (!checkIdMongo(userId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
  try {
    const user = await User.findById(userId);

    if (!user) {
<<<<<<< HEAD
      res.status(httpStatus.NOT_FOUND).json({
=======
      return res.status(httpStatus.NOT_FOUND).json({
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

    user.isLocked = !user.isLocked;
    await user.save();

<<<<<<< HEAD
    const { password: _, ...userResult } = user.toObject();

=======
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
    res.json({
      message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
      code: httpStatus.OK,
      data: {
<<<<<<< HEAD
        user: userResult,
=======
        user,
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
      },
    });
  } catch (error) {
    console.log(error);
<<<<<<< HEAD
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã sảy ra lỗi vui lòng thử lại",
=======
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui lòng thử lại',
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
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
