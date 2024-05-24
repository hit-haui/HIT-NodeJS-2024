const joi = require('joi');

const { objectId } = require('./custom.validation');

const name = joi.string().min(5).max(50).messages({
  'string.min': 'Vui lòng nhập tên lớp tối thiểu 5 ký tự',
  'string.max': 'Vui lòng nhập tên lớp không quá 50 ký tự',
});

const id = joi
  .string()
  .required()
  .messages({
    'any.required': 'Vui lòng truyền id',
  })
  .custom(objectId);

const place = joi.string().min(5).max(30).messages({
  'string.min': 'Vui lòng nhập địa điểm tối thiểu 5 ký tự',
  'string.max': 'Vui lòng nhập địa điểm không quá 30 ký tự',
});

const createClass = {
  body: joi.object({
    name: name.required().messages({
      'any.required': 'Vui lòng điền tên lớp',
    }),
    teacher: id.required().messages({
      'any.required': 'Vui lòng điền ID giáo viên',
    }),
    place: place.required().messages({
      'any.required': 'Vui lòng điền địa điểm',
    }),
  }),
};

const getClass = {
  params: joi.object({
    classId: id,
  }),
};

const getAllClass = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const updateClass = {
  params: joi.object({
    classId: id,
  }),
  body: joi
    .object({
      name: name.optional(),
      numberOfCredits: joi.number().integer().min(1).optional().messages({
        'number.min': 'Số tín chỉ tối thiểu là 1',
      }),
      maxStudentQuantity: joi.number().integer().min(0).max(70).optional().messages({
        'number.min': 'Số học sinh tối thiểu là 1',
        'number.max': 'Số học sinh tối đa là 70',
      }),
      place: place.optional(),
      startDate: joi.date().greater('now').optional(),
      endDate: joi.date().greater(joi.ref('startDate')).optional().messages({
        'date.greater': 'Ngày kết thúc phải muộn hơn ngày bắt đầu',
      }),
      teacher: id.optional(),
      students: joi.array().items(id).min(0).optional(),
    })
    .min(1)
    .messages({
      'object.min': 'Cần cập nhật ít nhật ít nhất 1 trường',
    }),
};

const deleteClass = {
  params: joi.object({
    classId: id,
  }),
};

const joinClass = {
  params: joi.object({
    classId: id,
  }),
  body: joi.object({
    studentId: id,
  }),
};

const leaveClass = {
  params: joi.object({
    classId: id,
  }),
  body: joi.object({
    studentId: id,
  }),
};

module.exports = { createClass, getClass, getAllClass, updateClass, deleteClass, joinClass, leaveClass };
