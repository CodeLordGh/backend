import mongoose from "mongoose";

const propriatorSchema = mongoose.Schema;

const propriator = new propriatorSchema({
    name: {
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

export default mongoose.model("Propriator", propriator);