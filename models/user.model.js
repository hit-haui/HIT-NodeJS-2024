const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const { SALT_WORK_FACTOR } = require('../constants/constants');

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
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
