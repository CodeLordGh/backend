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
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('School', schoolSchema)