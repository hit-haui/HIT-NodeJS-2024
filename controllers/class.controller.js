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

}

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
}

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
}

module.exports = { createClass, getClassById, getAllClass }