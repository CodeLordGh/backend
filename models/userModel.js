import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['adminone', 'headmaster', 'teacher', 'proprietor', 'parent'],
        default: 'parent',
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
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email){
                if(User.role === 'headmaster'){
                    return email && email.includes('@')
                }
                return true; // no validation for user role
            },
            message: "Email must be valid"
        },
    },
    occupation: {
        type: String,
        required: true,
        validate: {
            validator: function(occupation){
                if(User.role === 'parent'){
                    return occupation && occupation.length > 4;
                }
                return true; // no validation for user role
            },
            message: "Occupation must be valid"
        }
    },
    school:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

export default User;