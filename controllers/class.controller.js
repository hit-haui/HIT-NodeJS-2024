<<<<<<< HEAD
const httpStatus = require("http-status");
const Class = require('../models/class.model');
const User = require("../models/user.model");
const checkIdMongo = require("../utils/check-Id-Mongo");

const createClass = async (req, res) => {
    const createBody = req.body;

    try {
        const { name, teacher, place } = createBody;


        if (!name || !teacher || !place) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Vui long dien day du thong tin",
                code: httpStatus.BAD_REQUEST,
            })
        }


        if (!checkIdMongo(teacher)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Vui lòng truyền đúng định dạng ObjectId',
                code: httpStatus.BAD_REQUEST,
            });
        };


        const existingTeacher = await User.findById(teacher);


        if (!existingTeacher) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: `Không tìm thấy giao vien`,
                code: httpStatus.NOT_FOUND,
            });
        }

        const newClass = await Class.create(createBody);

        res.status(httpStatus.CREATED).json({
            message: "Tao thanh cong lop hoc!",
            code: httpStatus.CREATED,
            data: {
                class: newClass,
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Da xay ra loi, vui long thu lai!",
            code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }

};

const getClassById = async (req, res) => {
    const { classId } = req.params;

    try {
        const classroom = await Class.findById(classId).populate(
            {
                path: "teacher",
                select: "fullname email"
            }
        )

        if (!classroom) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "khong tim thay lop hoc!",
                code: httpStatus.NOT_FOUND
            });
        }

        res.status(httpStatus.OK).json({
            message: "Lay thong tin lop hoc thanh cong!",
            code: httpStatus.OK,
            data: {
                classroom,

            }
        });

    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Da xay ra loi, vui long thu lai!",
            code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};

const getAllClass = async (req, res) => {
    try {
        const classes = await Class.find({}).populate(
            [
                {
                    path: "teacher",
                    select: "_id fullname email avatar"
                },
                {
                    path: "students",
                    select: "_id fullname email avatar"
                }
            ]
        )

        res.json({
            message: "Lay danh sach lop hoc thanh cong!",
            code: httpStatus.OK,
            data: {
                classes,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Da xay ra loi, vui long thu lai!",
            code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};

const updateClassById = async (req, res) => {
    const { classId } = req.params;
    const { name, numberOfCredits, maxStudentQuantity, place, startDate, teacher, students } = req.body;

    try {
        const classroom = await Class.findById(classId);

        if (!classroom) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "khong tim thay lop hoc!",
                code: httpStatus.NOT_FOUND
            });
        }

        let classUpdate = {
            name: name ? name : classroom.name,
            numberOfCredits: numberOfCredits ? numberOfCredits : classroom.numberOfCredits,
            maxStudentQuantity: maxStudentQuantity ? maxStudentQuantity : classroom.maxStudentQuantity,
            place: place ? place : classroom.place,
            startDate: startDate ? startDate : classroom.startDate,
            teacher: teacher ? teacher : classroom.teacher,
            students: students ? students : classroom.students,
        }

        await Class.updateOne({ _id: classId }, classUpdate);

        res.json(
            {
                message: "Cap nhat lop hoc thanh cong!",
                code: httpStatus.OK,
                data: {
                    classroom,
                },
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Da xay ra loi, vui long thu lai!",
            code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};

const deleteClassById = async (req, res) => {
    const { classId } = req.params;

    try {
        const classroom = await Class.findById(classId);

        if (!classroom) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "khong tim thay lop hoc!",
                code: httpStatus.NOT_FOUND
            });
        }

        await Class.findByIdAndDelete(classId);

        res.json(
            {
                message: "Xoa lop hoc thanh cong!",
                code: httpStatus.OK,
                data: {
                    classroom,
                },
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Da xay ra loi, vui long thu lai!",
            code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};

const addStudentToClass = async (req, res) => {
    const { classId } = req.params;
    const { studentId} = req.body;

    if (!studentId || !classId) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Ban can nhap day du studenId va classId!",
            code: httpStatus.BAD_REQUEST
        });
    };

    try {
        const classroom = await Class.findById(classId);

        if (!classroom) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "khong tim thay lop hoc!",
                code: httpStatus.NOT_FOUND,
            });
        }

        if (classroom.students.includes(studentId)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Hoc sinh nay da ton tai trong lop!",
                code: httpStatus.BAD_REQUEST,
            });
        }

        classroom.students.push(studentId);
        await classroom.save();

        res.json({
            message: "Them hoc sinh vao lop hoc thanh cong!",
            code: httpStatus.OK,
            data: {
                classroom,
            }
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Da xay ra loi, vui long thu lai!",
            code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};

const removeStudentFromClass = async (req, res) => {
    const { classId } = req.params;
    const { studentId } = req.body;

    if (!studentId || !classId) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Ban can nhap day du studenId va classId!",
            code: httpStatus.BAD_REQUEST
        });
    };

    try {
        const classroom = await Class.findById(classId);

        if (!classroom) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "khong tim thay lop hoc!",
                code: httpStatus.NOT_FOUND,
            });
        }

        classroom.students = classroom.students.filter(_id => _id.toString() !== studentId);
        await classroom.save();

        res.json({
            message: "Xoa hoc sinh tu lop hoc thanh cong!",
            code: httpStatus.OK,
            data: {
                classroom,
            }
        });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Da xay ra loi, vui long thu lai!",
            code: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = { createClass, getClassById, getAllClass, updateClassById, deleteClassById, addStudentToClass, removeStudentFromClass }
=======
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
  createClass,
  getClassById,
};
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
