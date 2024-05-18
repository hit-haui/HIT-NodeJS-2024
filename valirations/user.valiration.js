const joi = require('joi');
const { createUser } = require('../controllers/user.controller');

createUser = joi.objects({
    fullname : joi.string().min(5).max(30).required(),
    email : joi.string().required(),
    password : joi.string().min(8).max(30).required(),
});

module.exports = {createUser};
