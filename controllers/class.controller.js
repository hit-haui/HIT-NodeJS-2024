const httpStatus = require('http-status');

const User = require('../models/user.model');
const Class = require('../models/class.model');
const checkIdMongo = require('../utils/check-id-mongo');

const createClass = async (req, res) => {
  const createBody = req.body;

  const { name, teacher, place } = createBody;

  if (!name || !place || !teacher) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui điền đầy đủ thông tin',
      code: httpStatus.BAD_REQUEST,
    });
  }

  if (!checkIdMongo(teacher)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    const existingTeacher = await User.findById(teacher);

    if (!existingTeacher) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Không tìm thấy giáo viên',
        code: httpStatus.NOT_FOUND,
      });
    }

    const newClass = await Class.create(createBody);

    res.status(httpStatus.CREATED).json({
      mesage: 'Tạo thành công lớp học',
      code: httpStatus.CREATED,
      data: {
        class: newClass,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui thử được thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const getClasses = async(req, res) => {
  try {
    const classes = await Class.find({}).populate([{
      path: 'teacher',
      select: 'id fullname email avatar'
    },
    {
      path: 'students',
      select: 'id fullname email avatar'
    }
  ])
    res.status(httpStatus.OK).json({
      mesage: 'Lấy danh sách lớp học thành công',
      code: httpStatus.OK,
      data:{
        classes
      }
    })
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra sự cố, vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR
    });
  }
}

const getClassById = async (req, res) => {
  const { classId } = req.params;

  if (!checkIdMongo(classId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    // const classroom = await Class.findById(classId).populate(['teacher', 'students']);
    const classroom = await Class.findById(classId).populate([
      {
        path: 'teacher',
        select: 'id, fullname, email, avatar',
      },
    ]);

    if (!classroom) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Không tìm thấy lớp học',
        code: httpStatus.NOT_FOUND,
      });
    }

    res.status(httpStatus.OK).json({
      message: 'Đã tạo lớp học',
      code: httpStatus.OK,
      data: {
        class: classroom,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui thử được thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateClassById = async(req, res) => {
  const {classId} = req.params;
  const updateBody = req.body;
  if(!checkIdMongo(classId))
  {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    })
  }

  try {
    const classroom = await Class.findByIdAndUpdate(classId, updateBody);
    if(!classroom){
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Không tìm thấy lớp học',
        code: httpStatus.NOT_FOUND,
      })
    }
    res.status(httpStatus.OK).json({
      message: "Cập nhập lớp học thành công",
      code: httpStatus.OK,
      data: {
        classroom
      }
    })

  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui thử được thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  createClass,
  getClasses,
  getClassById,
  updateClassById
};
