const mongoose = require('mongoose');

const Schema = mongoose.Schema;

<<<<<<< HEAD
const classSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    numberOfCredits: {
        type: Number,
        required: true,
        default: 3,
    },
    maxStudentQuantity: {
        type: Number,
        required: true,
        default: 65,
    },
    place: {
        type: String,
        trim: true,
        required: true,
    },
    startDate: {
        type: Date,
        default: '2000-01-01',
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ]
},
    { timestamps: true },
=======
const classSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    numberOfCredits: {
      type: Number,
      default: 3,
      required: true,
    },
    maxStudentQuantity: {
      type: Number,
      default: 65,
      required: true,
    },
    place: {
      type: String,
      trim: true,
      required: true,
    },
    startDate: {
      type: Date,
      default: '2000-01-01',
    },
    endDate: {
      type: Date,
      default: '2000-01-01',
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
>>>>>>> e0fa4ecdaeb86e5684cb5e0bacea4e47f093ceeb
);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
