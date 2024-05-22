const joi = require('joi');
const { objectId } = require('./custom.validation');

const createClass = {
  body: joi.object({
    name: joi.string().min(5).max(30).required().trim().strict().message({
      'any.required': 'Vui lòng điền tên lớp!',
    }),
    teacher: joi.string().min(5).max(30).required().trim().strict(),
    place:joi.string().min(5).max(30).required().trim().strict(),
  }),
}

const getClassById = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
}

const getAllClass = {
  query: joi.object({
    sortBy: joi.string().default('startDate: aesc'),
    limit: joi.number().integer().min(1).default(10),
    page: joi.number().integer().min(1).default(1),
  }),
}

const updateClassById = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    name: joi.string().min(5).max(30).optional(),
    numberOfCredits: joi.number().integer().min(1).default(3).optional(),
    maxStudentQuantity: joi.number().integer().min(1).default(65).optional(),
    place: joi.string().min(5).max(30).required().trim().strict().optional(),
    startDate: joi.date().optional(),
    endDate: joi.date().optional(),
    teacher: joi.string().min(5).max(30).required().trim().strict(),
    students: joi.array().items(joi.string().custom(objectId)).unique().max(70).optional(),
  }),
}

const deleteClassById = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
}

const joinClass = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    studentId: joi.string().required().custom(objectId),
  }),
}

const leaveClass = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    studentId: joi.string().required().custom(objectId),
  }),
}

module.exports = { createClass, getClassById, getAllClass, updateClassById, joinClass, leaveClass }