const joi = require('joi');

const { objectId } = require('./custom.validation');

const createUser = {
  body: joi.object({
    fullname: joi.string().min(5).max(30).required().messages({
      'any.required': 'Vui lòng điền tên người dùng',
    }),
    email: joi.string().email().required().messages({
      'any.required': 'Vui lòng điền email',
    }),
    password: joi.string().min(6).max(30).required().messages({
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

const updateUser = {
  params: joi.object({
    userId: joi.string().required().custom(objectId),
  }),
  body: joi.object({
    fullname: joi.string().min(5).max(30).optional(),
    password: joi.string().min(6).max(30).optional(),
  }),
};

const getUserById = {
  params: joi.object({
    userId: joi.string().required().custom(objectId),
  }),
};

const deleteUserById = {
  params: joi.object({
    userId: joi.string().required().custom(objectId),
  }),
};

const lockUserById = {
  params: joi.object({
    userId: joi.string().required().custom(objectId),
  }),
};

module.exports = { createUser, getUsers, updateUser, getUserById, deleteUserById, lockUserById };
