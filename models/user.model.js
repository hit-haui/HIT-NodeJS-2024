const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
      required: true,
      select: false
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

const User = mongoose.model('User', userSchema);

module.exports = User;
