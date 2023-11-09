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
    dateofbirth: {
        type: String,
        required: true
    },
    level:{
        type: String,
        require: true
    }
})

export default mongoose.model('Student', studentSchema)