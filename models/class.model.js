const mongoose = require('mongoose');
mongoose.set('debug', true)
const Schema = mongoose.Schema;


const classSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    numberOfCredit: {
      type: Number,
        default : 3,
    },
    maxStudentQuantity: {
      type: Number,
      default: 65,
      required: true,
    },
    place : {
        type: String,
        trim: true,
        required: true,
    },
    startDate : {
        type: Date,
        default: '2000-01-01',
        required: true,
    },
    teacher : {
        type : Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    students : [
        {
        type : Schema.Types.ObjectId,
        ref: 'User',
        },
      ],
    },
  { timestamps: true },
);


const Class = mongoose.model('Class', classSchema);
module.exports = Class;
