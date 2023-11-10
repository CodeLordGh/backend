import mongoose from "mongoose";

const schema =mongoose.Schema;

const studentSchema = new schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    level: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    school: {
        type: mongoose.Types.ObjectId,
        ref: "School"
    },
    dateofbirth: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Student', studentSchema)