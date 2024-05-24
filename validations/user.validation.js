const joi = require('joi');

const { objectId } = require('./custom.validation');

const fullname = joi.string().min(5).max(30).messages({
  'string.min': 'Vui lòng nhập tên người dùng tối thiểu 5 ký tự',
  'string.max': 'Vui lòng nhập tên người dùng không quá 30 ký tự',
});

const email = joi.string().email().messages({
  'string.email': 'Vui lòng điền đúng định dạng email',
});

const password = joi.string().min(6).max(30).messages({
  'string.min': 'Vui lòng nhập mật khẩu tối thiểu 6 ký tự',
  'string.max': 'Vui lòng nhập mật khẩu không quá 30 ký tự',
});

const userId = joi
  .string()
  .required()
  .messages({
    'any.required': 'Vui lòng truyền userId',
  })
  .custom(objectId);

const createUser = {
  body: joi.object({
    fullname: fullname.required().messages({
      'any.required': 'Vui lòng điền tên người dùng',
    }),
    email: email.required().messages({
      'any.required': 'Vui lòng điền email',
    }),
    password: password.required().messages({
      'any.required': 'Vui lòng điền mật khẩu',
    }),
  }),
};

const getUsers = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const getUser = {
  params: joi.object({
    userId,
  }),
};

const updateUser = {
  params: joi.object({
    userId,
  }),
  body: joi
    .object({
      fullname: fullname.optional(),
      email: email.optional(),
      password: password.optional(),
      dateOfBirth: joi.date().optional(),
      avatar: joi.string().optional(),
    })
    .min(1)
    .messages({
      'object.min': 'Cần cập nhật ít nhật ít nhất 1 trường',
    }),
};

const deleteUser = {
  params: joi.object({
    userId,
  }),
};

const lockUser = {
  params: joi.object({
    userId,
  }),
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser, lockUser };
