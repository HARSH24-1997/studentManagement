const mongoose = require('mongoose');
require('mongoose-type-email');


const studentScehema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
    },
    school: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    age: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    class: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    rollNo: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    subjectMarks: {
        type : mongoose.SchemaTypes.Array ,
        default: [] ,
        required: true
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentScehema);
module.exports = Student;