const httpStatus = require('http-status');

const User = require('../models/user.model');
const Class = require('../models/class.model');
const ApiError = require('../utils/ApiError.js');
const checkIdMongo = require('../utils/check-id-mongo');

const createClass = async (req, res) => {
  const createBody = req.body;

  const { name, teacher, place } = createBody;

  if (!name || !place || !teacher) {
   throw new ApiError(httpStatus.BAD_REQUEST , "Vui lòng điền đầy đủ thông tin !");
  }

  if (!checkIdMongo(teacher)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đúng định dạng ObjectId");
  }

  try {
    const existingTeacher = await User.findById(teacher);

    if (!existingTeacher) {
      throw new ApiError(http.status.NOT_FOUND, "Không tìm thấy giáo viên");
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
    next(error);
  }
};

const getClassById = async (req, res) => {
  const { classId } = req.params;

  if (!checkIdMongo(classId)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đúng định dạng ObjectId");
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
      throw new ApiError(http.status.NOT_FOUND, "Không tìm thấy lớp học");
    }

    res.status(httpStatus.OK).json({
      message: 'Đã tạo lớp học',
      code: httpStatus.OK,
      data: {
        class: classroom,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllClass = async (req, res) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = req.query;
  const skip = (+page - 1) * +limit;

  const [field, value] = sortBy.split(':');
  const sort = { [field]: value === 'asc' ? 1 : -1 };

  try {
    const query = {};

    const classes = await Class.find(query)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate([
        {
          path: 'teacher',
          select: 'id fullname email avatar',
        },
        {
          path: 'students',
          select: 'id fullname email avatar',
        },
      ]);

    const totalResults = await Class.countDocuments(query);
    res.status(httpStatus.OK).json({
      message: 'Lấy thành công các lớp học',
      code: httpStatus.OK,
      data: {
        classes,
        limit: +limit,
        currentPage: +page,
        totalPages: Math.ceil(totalResults / +limit),
        totalResults,
      },
    });
  } catch (error) {
    next(error);
  }
}

const updateClassById = async (req, res) => {
  const { classId } = req.params;

  const updateBody = req.body;

  if (JSON.stringify(updateBody) == '{}') {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đầy đủ thông tin");
  }

  if (!checkIdMongo(classId)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đúng định dạng ObjectId");
  }

  try {
    const classroom = await Class.findById(classId);

    if (!classroom) {
      throw new ApiError(http.status.NOT_FOUND, "Không tìm thấy lớp học");
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
   next(error);
  }
}

const deleteClassById = async (req, res) => {
  const {classId} = req.params;

  if (!checkIdMongo(classId)) {
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đúng định dạng ObjectId");
  }  

  try{
    const classDel = await Class.findByIdAndDelete(classId);

    if(!classDel){
      throw new ApiError(http.status.NOT_FOUND, "Không tìm thấy lớp học");
    }

    return res.status(httpStatus.OK).json({
      message: 'Xóa lớp thành công',
      code: httpStatus.OK,
      data: {
        classDel,
      }
    });

  }catch(error){
    next(error);
  }
}

const joinClass = async (req, res) => {
  const {classId} = req.params;
  const {studentId} = req.body;

  if(!checkIdMongo(classId) ){
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đúng định dạng ObjectId");
  }

  try{
    const classroom = await Class.findById(classId);

    if(!classroom){
      throw new ApiError(http.status.NOT_FOUND, "Không tìm thấy lớp học");
    }

    if(!classroom.students?.includes(studentId)){
      classroom.students.push(studentId);
    }else{
      throw new ApiError(http.status.BAD_REQUEST, "Đã tồn tại lớp học");
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
    next(error);
  }
}

const leaveClass = async (req, res) => {
  const {classId} = req.params;
  
  const {studentId} = req.body;

  if(!checkIdMongo(classId) ){
    throw new ApiError(http.status.BAD_REQUEST, "Vui lòng điền đúng định dạng ObjectId");
  }

  try{
    const classroom = await Class.findById(classId);

    if(!classroom){
      throw new ApiError(http.status.NOT_FOUND, "Không tìm thấy lớp học");
    }

    if(classroom.students?.includes(studentId)){
      classroom.students.remove(studentId);
    }else{
      throw new ApiError(http.status.BAD_REQUEST, "Lớp học đã tồn tại");
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
    next(error);
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
