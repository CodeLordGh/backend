import mongoose from "mongoose";

const schema =mongoose.Schema;

const schoolSchema = new schema({
    name: {
        type: String,
        required: true
    },
    propriatorname: {
        type: String,
        required: true
    },
    headmastername: {
        type: String,
        required: true
    },
    schoolline: {
        type: String,
        required: true,
        unique: true
    },
    student: [{
        type: mongoose.Types.ObjectId,
        ref: 'Student',
    }],
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
}, { timestamps: true })

const School = mongoose.model('School', schoolSchema);

export default School;