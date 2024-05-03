const httpStatus = require('http-status');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const sanitizeUser = (user) => {
  // Tạo một bản sao của đối tượng người dùng và loại trừ mật khẩu
  const { password, ...safeUser } = user.toObject(); // Chuyển thành đối tượng và loại trừ mật khẩu
  return safeUser;
};

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

    //Kiểm tra email
    if(await User.findOne({ email })){
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Email đã tồn tại',
        code: httpStatus.BAD_REQUEST,
      });
    }

    //Băm mật khẩu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({'fullname' : fullname, 'email' : email, 'password': hashedPassword});

    const sanitizedUser = sanitizeUser(user);

    return res.status(httpStatus.CREATED).json({
      message: 'Đã tạo người dùng thành công',
      code: httpStatus.CREATED,
      data: {
        sanitizedUser,
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
    const users = await User.find({}).select('-password');

    res.json({
      message: 'Lấy thành công mảng người dùng',
      code: httpStatus.OK,
      data: {
        users,
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

    const sanitizedUser = sanitizeUser(user);
    res.json({
      message: `Lấy thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        sanitizedUser,
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

  if(!(/^([a-vA-Zxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[A-Za-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/).test(fullname)){
    //Chỉ có chữ cái từ a đến z và A đến Z và khoảng trống được phép có trong tên;
    // Ký tự đầu và cuối phải là chữ cái;
    // Họ tên phải bao gồm ít nhất 2 từ (chữ) trở lên;
    // Giữa các từ chỉ có một dấu cách;
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng fullname',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try{
    const user = await User.findById(userId);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }
    user.fullname = fullname;
    const sanitizedUser = sanitizeUser(user);
    res.json({
      message: `Cập nhật thông tin người dùng thành công`,
      code: httpStatus.OK,
      data: {
        sanitizedUser,
      },
    });
  }catch(error){
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

  try{
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }
    const sanitizedUser = sanitizeUser(user);
    res.json({
      message: `Xoá người dùng thành công`,
      code: httpStatus.OK,
      data: {
        sanitizedUser,
      },
    });
  }catch(error){
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

  try{
    const user = await User.findById(userId);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        message: `Không tìm thấy người dùng`,
        code: httpStatus.NOT_FOUND,
      });
    }

    user.isLocked = !user.isLocked;
    await user.save();
    const sanitizedUser = sanitizeUser(user);
    res.json({
      message: user.isLocked ? 'Khoá người dùng thành công' : 'Mở khoá người dùng thành công',
      code: httpStatus.OK,
      data: {
        sanitizedUser,
      },
    });
  }catch(error){
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
