const joi = require('joi');

const { objectId } = require('./custom.validation');

const createUser = {
  body: joi.object({
    fullname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

const updateUser = {
  params: joi.object({ userId: joi.string().required().custom(objectId) }),
  body: joi.object({
    fullname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

module.exports = { createUser, updateUser };
