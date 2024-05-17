const httpStatus = require('http-status');

const User = require('../models/user.model');
const Class = require('../models/class.model');
const checkIdMongo = require('../utils/check-id-mongo');
const { query } = require('express');

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
        select: '-avatar',
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

const getAllClass = async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt : desc'} = req.query;
  const skip = (page - 1) * limit;

  const [field, value] = sortBy.split(':');
  const sort = {[field] : value === 'asc' ? 1:-1};

  try{
    const query = {};

    const classes = await Class.find(query).limit(limit).skip(skip).sort(sort).populate([
      {
        path:'teacher',
        select: 'id fullname email avatar'
      },
      {
        path:'students',
        select: 'id fullname email avatar'
      }
    ])

    const totalResults = await Class.countDocuments(query);

    res.status(httpStatus.OK).json({
      message: 'Lấy thành công các lớp học',
      code: httpStatus.OK,
      data: {
        classes,
        limit: +limit,
        currentPage: +page,
        totalPage: Math.ceil(totalResults/limit),
        totalResults,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui lòng thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

const updateClassById = async (req, res) => {
  const { classId } = req.params;

  const updateBody = req.body;

  if (JSON.stringify(updateBody) == '{}') {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui điền đầy đủ thông tin',
      code: httpStatus.BAD_REQUEST,
    });
  }

  if (!checkIdMongo(classId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try {
    const classroom = await Class.findById(classId);

    if (!classroom) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Không tìm thấy lớp học',
        code: httpStatus.NOT_FOUND,
      });
    }

    Object.assign(classroom, updateBody);

    classroom.save();

    res.json({
      message: `Cập nhật thông tin classroom thành công`,
      code: httpStatus.OK,
      data: {
        classroom,
      },
    });

  }catch(error){
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui thử được thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

const deleteClassById = async (req, res) => {
  const {classId} = req.params;

  if (!checkIdMongo(classId)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }  

  try{
    const classDel = await Class.findByIdAndDelete(classId);

    if(!classDel){
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Không tim thấy lớp học",
        code: httpStatus.NOT_FOUND,
      });
    }

    return res.status(httpStatus.OK).json({
      message: 'Xóa lớp thành công',
      code: httpStatus.OK,
      data: {
        classDel,
      }
    });

  }catch(error){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã xảy ra lỗi",
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

const joinClass = async (req, res) => {
  const {classId} = req.params;
  const {studentId} = req.body;

  if(!checkIdMongo(classId) ){
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try{
    const classroom = await Class.findById(classId);

    if(!classroom){
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Không tim thấy lớp học",
        code: httpStatus.NOT_FOUND,
      });
    }

    if(!classroom.students?.includes(studentId)){
      classroom.students.push(studentId);
    }else{
      return res.status(httpStatus.CONFLICT).json({
        message: "Đã tồn tại trong lớp học",
        code: httpStatus.CONFLICT,
      });
    }

    await classroom.save();

    return res.status(httpStatus.OK).json({
      message: "Tham gia thành công",
      code: httpStatus.OK,
      data:{
        classroom,
      }
    });

  }catch(error){
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: 'Đã xảy ra lỗi vui lòng thử lại',
    code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

const leaveClass = async (req, res) => {
  const {classId} = req.params;
  
  const {studentId} = req.body;

  if(!checkIdMongo(classId) ){
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'Vui lòng truyền đúng định dạng ObjectId',
      code: httpStatus.BAD_REQUEST,
    });
  }

  try{
    const classroom = await Class.findById(classId);

    if(!classroom){
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Không tim thấy lớp học",
        code: httpStatus.NOT_FOUND,
      });
    }

    if(classroom.students?.includes(studentId)){
      classroom.students.remove(studentId);
    }else{
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Không tồn tại trong lớp học",
        code: httpStatus.NOT_FOUND,
      });
    }

    await classroom.save();

    res.status(httpStatus.OK).json({
      message: 'Rời lớp học thành công',
      code: httpStatus.OK,
      class: {
        classroom,
      },
    });

  }catch(error){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Đã xảy ra lỗi",
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  createClass,
  getClassById,
  getAllClass,
  updateClassById,
  deleteClassById,
  joinClass,
  leaveClass,
};
