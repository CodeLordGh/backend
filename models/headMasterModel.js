import mongoose from "mongoose";

const schema = mongoose.Schema;

const headmasterSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (email) => email && email.include('@')
        },
        message: "Email must be valid"
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
    password: {
        type: String,
        required: true
    },
})

export default mongoose.model('Headmaster', headmasterSchema)