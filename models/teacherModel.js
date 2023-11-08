import mongoose from "mongoose";

const schema = mongoose.Schema;

const teacherSchema = new schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    school:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    classes: [{
        type: String,
        required: true,
    }],
    subjects: [{
        type: String,
        required: true,
    }],
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model('Teacher', teacherSchema)