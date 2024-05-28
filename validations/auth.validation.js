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
    fullname: joi.string().min(5).max(30).optional(),
    email: joi.string().email().optional(),
    dateOfBirth: joi.date().less('now').optional(),
    avatar: joi.string().optional(),
  }),
};

const changePassword = {
  body: joi.object({
    oldPassword: joi.string().min(6).max(30).required(),
    newPassword: joi.string().min(6).max(30).required().not(joi.ref('oldPassword')).messages({
      'any.invalid': 'Mật khẩu mới không được trùng với mật khẩu cũ',
    }),
    repeatPassword: joi.string().min(6).max(30).required().valid(joi.ref('newPassword')).messages({
      'any.only': 'Mật khẩu nhập lại không khớp',
    }),
  }),
};

module.exports = { register, login, updateProfile, changePassword };
