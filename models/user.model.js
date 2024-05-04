const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = User;
