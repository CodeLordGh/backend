import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

const user = {
    getAllusers: (req, res) =>{
        let user;

        try {
            user = User.find()
        } catch (error) {
            return console.log(error)
        }
        if(!user){
            return res.status(404).json({
                message: 'No user found'
            })
        }
        return res.status(200).json({ user })
    },

    createUser: async (req, res) => {
        const { name, phone, location, password, email, role, occupation, schoolID } = req.body;
        let existingUser;
        
        if (!name || !phone || !location || password || role || schoolID) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if(!mongoose.Schema.Types.ObjectId.isValid(schoolID)){
            return res.status(400).json({
                message: "Invalid ID"
            });
        }

        try {
            existingUser = await User.findOne({ phone })
        } catch (error) {
            return console.log(error);
        }
        if (existingUser) {
            return res.status(400).json({ message: "User already exist!" })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            phone,
            location,
            schoolID,
            password : hashedPassword
        })

        if (role === 'headmaster'){
            user.email = email
        }

        if(role === 'parent'){
            user.occupation = occupation
        }

        try {
            await user.save()
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Error saving data to the database"
            })
        }
        
        return res.status(201).json({
            message: `User ${name} ${phone} is successfully created!`
        })
    },
    loginUser: async (req, res) => {
        const { phone, password, role } = req.body;
        let user;
        
        if (!phone ||!password) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }

        try {
            user = await User.findOne({ phone })
        } catch (error) {
            return console.log(error);
        }
        if (!user) {
            return res.status(400).json({ message: "User not found!" })
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password!" })
        }
        
        const token = jwt.sign({ phone, role, userId: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 })
        
        return res.status(200).json({
            token,
            user
        })

    }
}

export default user;