const httpStatus = require('http-status');

const User = require('../models/user.model');
const checkIdMongo = require('../utils/check-id-mongo');

const createUser = async (req, res , next) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
     throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đầy đủ thông tin ");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new ApiError(http.status.BAD_REQUEST, "Email đã tồn tại. Vui lòng sử dụng email khác.");
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
    next(error);
  }
};

const getUsers = async (req, res , next) => {
  const {limit = 10 , page = 1 , sortBy = 'createdAt:desc'} = req.query;

  const [field, value] = sortBy.split(':');
  const sort = {[field]: value === 'asc' ? 1 : -1};

  const skip = ((+page) - 1) * (+limit);
  try {
    const query = {};
    const users = await User.find(query).limit(limit).skip(skip).sort(sort);
    const totalResults = await User.countDocuments(query);
    res.json({
      message: 'Lấy thành công mảng người dùng',
      code: httpStatus.OK,
      data: {
        users: users,
        limit : +limit,
        currentPage : +page,
        totalPages : Math.ceil(totalResults / (+limit)),
        totalResults,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res,next) => {
  const { userId } = req.params;

  if (!checkIdMongo(userId)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng truyền đúng định dạng ObjectId");
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(http.status.BAD_REQUEST, "Không tìm thấy người dùng");
    }

    res.json({
      message: `Lấy thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const updateBody = req.body;

  if (!checkIdMongo(userId)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng truyền đúng định dạng ObjectId");
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(http.status.BAD_REQUEST, "Không tìm thấy người dùng");
    }

    Object.assign(user, updateBody);

    await user.save();

    res.json({
      message: `Cập nhật thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res) => {
  const { userId } = req.params;

  if (!checkIdMongo(userId)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng truyền đúng định dạng ObjectId");
  }

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new ApiError(http.status.BAD_REQUEST, "Không tìm thấy người dùng");
    }

    res.json({
      message: `Xoá người dùng thành công`,
      code: httpStatus.OK,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const lockUserById = async (req, res) => {
  const { userId } = req.params;

  if (!checkIdMongo(userId)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng truyền đúng định dạng ObjectId");
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(http.status.BAD_REQUEST, "Không tìm thấy người dùng");
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
    next(error);
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
