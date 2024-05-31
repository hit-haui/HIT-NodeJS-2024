const joi = require('joi');

const register = {
  body: joi.object({
    fullname: joi.string().min(5).max(30).required().messages({
      'any.required': 'Vui lòng điền tên người dùng',
    }),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  }),
};

const login = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  }),
};

const updateProfile = {
  body: joi.object({
    fullname: joi.string().min(5).max(30).optional().messages({
      'any.required': 'Vui lòng điền tên người dùng',
    }),
    dateOfBirth: joi.date().optional()
  }),
}

const changePassword = {
  body: joi.object({
    password: joi.string().required().messages({
      'any.required': 'Phải điền mật khẩu cũ',
    }),
    newPassword: joi.string().min(6).max(30).required()
  }),
}

module.exports = { register, login, updateProfile, changePassword };
