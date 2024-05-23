const joi = require("joi");
const { objectId } = require("./custom.validation");

const createClass = {
    body: joi.object({
        name: joi.string().trim().min(5).max(30).required().messages({
            'any.required': 'Vui lòng điền tên lớp',
            'string.min': 'Tên lớp phải có ít nhất 5 ký tự',
            'string.max': 'Tên lớp không được vượt quá 30 ký tự',
            'string.empty': 'Tên lớp không được để trống'
        }),
        teacher: joi.string().trim().required().custom(objectId).messages({
            'any.required': 'Vui lòng điền id giáo viên',
            'string.empty': 'ID giáo viên không được để trống'
        }),
        place: joi.string().trim().min(5).max(30).required().messages({
            'any.required': 'Vui lòng điền địa điểm',
            'string.min': 'Địa điểm phải có ít nhất 5 ký tự',
            'string.max': 'Địa điểm không được vượt quá 30 ký tự',
            'string.empty': 'Địa điểm không được để trống'
        }),
    }),
};

const getClassById = {
    params: joi.object({
        classId: joi.string().required().custom(objectId),
    }),
};

const getAllClass = {
    query: joi.object({
        sortBy: joi.string(),
        limit: joi.number().integer(),
        page: joi.number().integer(),
    }),    
};

const updateClassById = {
    params: joi.object({
        classId: joi.string().required().custom(objectId),
    }),
    body: joi.object({
        name: joi.string().trim().min(5).max(30).optional(),
        numberOfCredits: joi.number().min(5).max(30).optional(),
        maxStudentQuantity: joi.number().min(30).max(80).optional(), 
        place: joi.string().trim().min(5).max(30).optional(),  
        startDate: joi.date().optional(),
        endDate: joi.date().optional(), 
        teacher: joi.string().trim().min(5).max(30).optional().custom(objectId), 
        students: joi.array().items(joi.string().custom(objectId)).unique().max(70).optional(), 
    }),
};

const deleteClassById = {
    params: joi.object({
        classId: joi.string().required().custom(objectId),
    }),
};

const joinClass = {
    params: joi.object({
        classId: joi.string().required().custom(objectId),
    }),
    body: joi.object({
        studentId: joi.string().required().custom(objectId),
    })
};

const leaveClass = {
    params: joi.object({
        classId: joi.string().required().custom(objectId),
    }),
    body: joi.object({
        studentId: joi.string().required().custom(objectId),
    })
};

module.exports = { createClass, getClassById, getAllClass, updateClassById, deleteClassById, joinClass, leaveClass }
