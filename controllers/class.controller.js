const httpStatus = require('http-status');

const User = require('../models/user.model');
const Class = require('../models/class.model');
const checkIdMongo = require('../utils/check-id-mongo');

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({}).populate([
      {
        path: 'teacher',
        select: 'id fullname email avatar',
      },
      {
        path: 'students',
        select: 'id fullname email avatar',
      }
    ]);
    return res.status(httpStatus.OK).json({
      message: 'Lấy danh sách các lớp thành công',
      code: httpStatus.OK,
      data: classes
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Có lỗi xảy ra ${err}`,
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

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

const updateClassById = async (req, res) => {
  const { classId } = req.params;

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

    await Class.updateOne({ _id: classId }, req.body);
    Object.assign(classroom, req.body);

    res.status(httpStatus.OK).json({
      message: 'Update thông tin lớp học thành công',
      code: httpStatus.OK,
      class: classroom
    });
  } catch (err) {
    console.log(err)
  }
}

const deleteClassById = async (req, res) => {
  const { classId } = req.params;

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

    await Class.deleteOne({ _id: classId });

    res.status(httpStatus.OK).json({
      message: 'Xóa lớp học thành công',
      code: httpStatus.OK,
      class: classroom
    });
  } catch (err) {
    console.log(err)
  }
}

const joinClass = async (req, res) => {
  const { classId } = req.params;

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
    const { studentId } = req.body;
    if (!checkIdMongo(studentId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Vui lòng truyền đúng định dạng ObjectId',
        code: httpStatus.BAD_REQUEST,
      });
    }
    const student = await User.findById(studentId);
    if (!!student) {
      classroom.students = [...classroom.students, student];
      await classroom.save();

      return res.status(httpStatus.OK).json({
        message: 'Thêm vào lớp thành công',
        code: httpStatus.OK,
        data: classroom
      });
    }
    else {
      res.status(httpStatus.BAD_REQUEST).json({
        message: 'Thêm không thành công',
        code: httpStatus.BAD_REQUEST,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui thử được thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

const leaveClass = async (req, res) => {
  const { classId } = req.params;

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
    const { studentId } = req.body;
    if (!checkIdMongo(studentId)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'Vui lòng truyền đúng định dạng ObjectId',
        code: httpStatus.BAD_REQUEST,
      });
    }
    const student = await User.findById(studentId);
    if (!!student) {
      classroom.students.includes(studentId) ?
        classroom.students.remove(studentId)
        :
        res.status(httpStatus.BAD_REQUEST).json({
          message: 'Sinh viên không có trong lớp học',
          code: httpStatus.BAD_REQUEST,
        });
      await classroom.save();
      return res.status(httpStatus.OK).json({
        message: 'Xóa khỏi lớp thành công',
        code: httpStatus.OK,
        data: classroom
      });
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Đã xảy ra lỗi vui thử được thử lại',
      code: httpStatus.INTERNAL_SERVER_ERROR,
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

module.exports = {
  getClasses,
  createClass,
  getClassById,
  updateClassById,
  deleteClassById,
  joinClass,
  leaveClass,
};
