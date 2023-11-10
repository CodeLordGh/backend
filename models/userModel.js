import mongoose from "mongoose";

const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['adminone', 'headmaster', 'teacher', 'proprietor', 'parent'],
        default: 'parent',
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
    school: {
        type: mongoose.Types.ObjectId,
        ref: 'School',
        required: true
    },
    // email: {
    //     type: String,
    //     unique: true,
    //     validate: {
    //         validator: function(email){
    //             if(User.role === 'headmaster'){
    //                 return email && email.includes('@')
    //             }
    //             return true; // no validation for user role
    //         },
    //         message: "Email must be valid"
    //     },
    // },
    occupation: {
        type: String,
        validate: {
            validator: function(occupation){
                if(User.role === 'parent'){
                    return occupation && occupation.length > 4;
                }
                return true; // no validation for user role
            },
            message: "Occupation must be valid"
        },
        
    },
    classes: [{
        type: String,
        validate: {
            validator: function(classes){
                if(User.role === 'teacher'){
                    return classes && classes.length > 4 ;
                }
                return true; // no validation for user role
            },
            message: "Classes must be valid"
        }
    }],
    subjects: [{
        type: String,
        validate: {
            validator: function(subjects){
                if(User.role === 'teacher'){
                    return subjects && subjects.length > 4 ;
                }
                return true; // no validation for user role
            },
            message: "Subjects must be valid"
        }
    }],
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;