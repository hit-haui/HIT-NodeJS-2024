const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { SALT_WORK_FACTOR } = require('../constants');

const Schema = mongoose.Schema;

<<<<<<< HEAD
const userSchema = new Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
=======
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      default: '2000-01-01',
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: 'https://th.bing.com/th/id/OIP.z3fa8PjEnvzg4bhW61tEOwAAAA?rs=1&pid=ImgDetMain',
    },
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
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

<<<<<<< HEAD
userSchema.pre('find', function (next) {
  console.log("find user");
=======
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
  }

>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
