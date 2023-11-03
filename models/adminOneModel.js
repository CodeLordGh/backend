import mongoose from "mongoose";

const schema = mongoose.Schema;

const adminOneSchema = new schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model("AdminOne", adminOneSchema);