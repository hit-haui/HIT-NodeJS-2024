const joi = require('joi');

const { objectId } = require('./custom.validation');

const createClass = {
  body: joi.object({
    name: joi.string().min(1).required().messages({
      'any.required': 'Vui lòng điền tên lớp',
    }),
    place: joi.string().required().messages({
      'any.required': 'Vui lòng điền địa chỉ của lớp học',
    }),
    teacher: joi.string().required().custom(objectId).messages({
      'any.required': 'Vui lòng điền mã giáo viên dạy lớp học',
    }),
  }),
};

const getClasses = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const checkObjectId = {
  params: joi.object({
    classId: joi.string().required().custom(objectId)
  })
}

const updateClass = {
  params: joi.object({
    classId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    name: joi.string().min(1).required().messages({
        'any.required': 'Vui lòng điền tên lớp',
    }),
    place: joi.string().required().messages({
    'any.required': 'Vui lòng điền địa chỉ của lớp học',
    }),
    teacher: joi.string().required().custom(objectId).messages({
    'any.required': 'Vui lòng điền mã giáo viên dạy lớp học',
    }),
  }),
};

module.exports = { createClass, updateClass,getClasses,checkObjectId };
