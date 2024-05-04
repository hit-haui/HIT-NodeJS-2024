const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
