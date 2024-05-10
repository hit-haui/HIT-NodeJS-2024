const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
