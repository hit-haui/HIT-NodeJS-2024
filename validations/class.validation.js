const joi = require('joi');

const { objectId } = require('./custom.validation');

const createClass = {
  body: joi.object({
    name: joi.string().min(5).max(30).required().messages({
      'any.required': 'Vui lòng điền tên lớp',
    }),
    teacher: joi.string().min(5).max(30).required(),
    place: joi.string().min(6).max(20).required(),
  }),
};

const getClasses = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer().min(1),
    page: joi.number().integer().min(1),
  }),
};

const getClassById = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
};

const updateClass = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    name: joi.string().min(5).max(30).optional(),
    numberOfCredits: joi.number().min(5).max(30).optional(),
    maxStudentQuantity: joi.number().min(30).max(80).optional(),
    place: joi.string().min(5).max(30).optional(),
    startDate: joi.date().optional(),
    endDate: joi.date().optional(),
    teacher: joi.string().min(5).max(30).optional().custom(objectId),
    students: joi.array().items(joi.string().custom(objectId)).unique().max(70).optional(),
  }),
};

const deleteClass = {
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
  }),
};

const leaveClass = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    studentId: joi.string().required().custom(objectId),
  }),
};

module.exports = { createClass, updateClass, getClasses, getClassById, deleteClass, joinClass, leaveClass };
