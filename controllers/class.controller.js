const httpStatus = require('http-status');
const User = require('../models/user.model');
const Class = require('../models/class.model');
const checkIdMongo = require('../utils/check-id-mongo');

const createClass = async (req , res) => {
    const createBody = req.body;
    
    const {name , teacher, place} = createBody;

    if(!name || !teacher) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Vui lòng điền đầy đủ thông tin",
            code : httpStatus.BAD_REQUEST,
        });
    };

    if (!checkIdMongo(teacher))  {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: 'Vui lòng truyền đúng định dạng ObjectId',
          code: httpStatus.BAD_REQUEST,
        });
      }

    const exittingTeacher = await User.findById(teacher);

    try {
        if(!exittingTeacher){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Giáo viên không tồn tại",
                code : httpStatus.NOT_FOUND,
            });
        }

        const newClass = await Class.create(createBody);

        res.status(httpStatus.CREATED).json({
            message: "Tạo lớp mới thành công",
            code : httpStatus.CREATED,
            data : newClass,
        })
    }catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Đã xảy ra lỗi",
            code : httpStatus.INTERNAL_SERVER_ERROR,
        });
    }

};
const getClassById = async (req, res) => {
    const { classId } = req.params;
    // console.log(classId);
    // console.log(req.params);    
  
    if (!checkIdMongo(classId))  {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Vui lòng truyền đúng định dạng ObjectId',
        code: httpStatus.BAD_REQUEST,
      });
    }
  
    try {
      const classroom = await User.findById(classId).populate('teacher');
      if (!classroom) {
        res.status(httpStatus.NOT_FOUND).json({
          message: `Không tìm thấy người dùng`,
          code: httpStatus.NOT_FOUND,
        });
      }
  
      res.json({
        message: `Lấy thông tin lớp thành công`,
        code: httpStatus.OK,
        data: {
          classroom,
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

  const updateClassById = async (req, res) => {
    const { classId } = req.params;
    const updateBody = req.body;
  
    if (!checkIdMongo(classId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Vui lòng truyền đúng định dạng ObjectId',
        code: httpStatus.BAD_REQUEST,
      });
    }
  
    try {
      const classroom = await User.findById(classId);
  
      if (!classroom) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: `Không tìm thấy người dùng`,
          code: httpStatus.NOT_FOUND,
        });
      }
  
      Object.assign(classroom, updateBody);
  
      await user.save();
  
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
        message: 'Đã xảy ra lỗi vui lòng thử lại',
        code: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };
module.exports = {
    createClass,
    getClassById,
    updateClassById,
};
