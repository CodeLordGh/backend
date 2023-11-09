import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import School from "../models/schoolModel.js";

const user = {
    getAllusers: async (req, res) =>{
        let user;

        try {
            user = await User.find()
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
        const { name, phone, location, password, email, role, occupation, school, classes, subjects } = req.body;
        let existingUser;
        let existingSchool;
        
        if (!name || !phone || !location || !password || !role || !school) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        try {
            existingSchool = await School.findById(school)
        } catch (error) {
            return console.log(error);
        }

        if (!existingSchool) {
            return res.status(400).json({ message: "SchoolId doesn't match any ID in the database!" })
        }

        if((role === 'headmaster' || role === 'proprietor' || role === 'adminone') && await User.find({role, school})){
            return res.status(400).json({ message: `User with this role already exists for this school!` })
        }
        try {
            existingUser = await User.findOne({ phone } || {email})
        } catch (error) {
            return console.log(error);
        }
        if (existingUser) {
            res.status(400)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            phone,
            role,
            location,
            school,
            password : hashedPassword
        })

        if (role === 'headmaster'){
            user.email = email
        }

        if(role === 'parent'){
            user.occupation = occupation
        }

        if (role === 'teacher'){
            user.classes = classes
            user.subjects = subjects
        }
        

        const session = await mongoose.startSession();
        try {          
            // Start a transaction
            session.startTransaction();
          
            await user.save({ session });
            existingSchool.users.push(user._id);
            await existingSchool.save({ session });
          
            // Commit the transaction
            await session.commitTransaction();
          
            // End the session
            await session.endSession();
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error saving data to the database' });
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

    },

    getRoleBasedUsers: async (req, res) =>{
        const { role, school } = req.body;
        let users;

        if (!role ||!school) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }

        try {
            users = await User.find({ role, school })
        } catch (error) {
            return console.log(error);
        }
        if (!users) {
            return res.status(400).json({ message: "No users found!" })
        }
        
        return res.status(200).json({ users })
    }
}

export default user;