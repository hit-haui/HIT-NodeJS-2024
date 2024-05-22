const joi = require('joi');

const { objectId } = require('./custom.validation');

const createUser = {
  body: joi.object({
    fullname: joi.string().min(5).max(30).required().messages({
      'any.required': 'Vui lòng điền tên người dùng',
    }),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  }),
};

const getUsers = {
  query: joi.object({
    sortBy: joi.string(),
    limit: joi.number().integer(),
    page: joi.number().integer(),
  }),
};

const updateUser = {
  params: joi.object({
    userId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    fullname: joi.string().min(5).max(30).optional(),
    password: joi.string().min(6).max(30).optional(),
  }),
};

module.exports = { createUser, updateUser };
