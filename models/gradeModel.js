import mongoose from "mongoose";

const schema = mongoose.Schema;

const gradeSchema = new schema({
    student: {
        type: schema.Types.ObjectId,
        ref: "Student"
    },
    grade: {
        type: Number,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    subject: {
        type: String,
        enum: ['Mathematics', 'English', 'French', 'Ewe', 'Biology'],
        required: true,
    }
}, {timestamps: true})

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;