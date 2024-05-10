const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { SALT_WORK_FACTOR } = require('../constants');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select:false,  //mot cach khac de loai bo password ra khoi res
  },
  dateOfBirth: {
    type: Date,
    default: Date.now(),
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: '',
  },
},
 {timestamps: true},
);

userSchema.pre('find', function (next) {
  console.log("find user");
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
