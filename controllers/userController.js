import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt, { sign } from 'jsonwebtoken'
import mongoose from "mongoose";
import School from "../models/schoolModel.js";

const user = {
    // get all users regardless of the school location or any other querry
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

    //get user by id
    getUserByID: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        let user;
        try {
            user = await User.findById(id)
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

    //create new user for a particular school
    createUser: async (req, res) => {
        const { name, phone, location, password, role, occupation, school, classes, subjects } = req.body;
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

        if((role === 'headmaster' || role === 'proprietor' || role === 'adminone') && ((await User.find({role, school})).length >= 1)){
            return res.status(400).json({ message: `User with this role already exists for this school!` })
        }

        try {
            existingUser = await User.findOne({ phone })
        } catch (error) {
            return console.log(error);
        }
        console.log(existingUser)

        if (existingUser) {
            return res.status(400).json({message: "User already exist!"})
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

        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role,
                school: user.school,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        req.session.user = user;
        req.session.token = token;

        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        return res.send({ success: true, token });
        // return res.status(201).json({
        //     message: `User ${name} ${phone} is successfully created!`
        // })
    },

    //update user info
    updateUser: async (req, res) => {
        const { id } = req.params;
        let user;
        
        if (!id) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }

        try {
            user = await User.findByIdAndUpdate( id, {
                name: req.body.name,
                phone: req.body.phone,
                role: req.body.role,
                location: req.body.location,
                occupation: req.body.occupation,
                school: req.body.school,
                classes: req.body.classes,
                subjects: req.body.subjects
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error updating data to the database' });
        }
        if (!user) {
            return res.status(400).json({ message: "User not found!" })
        }
        return res.status(200).json({
            message: `User ${id} is successfully updated!`
        })
    },

    //delete user
    deleteUser: async (req, res) => {
        const { id } = req.params;
        let user;
        
        if (!id) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }

        try {
            user = await User.findById(id)
        } catch (error) {
            return console.log(error);
        }
        if (!user) {
            return res.status(400).json({ message: "User not found!" })
        }

        const session = await mongoose.startSession();
        try {          
            // Start a transaction
            session.startTransaction();
          
            await user.deleteOne({ session });
            const index = user.school.users.indexOf(user._id);
            user.school.users.splice(index, 1);
            await user.school.save({ session });
            await user.save({ session });
          
            // Commit the transaction
            await session.commitTransaction();
          
        } catch (error) {
            console.log(error);
            await session.abortTransaction()
            return res.status(400).json({ message: 'Error deleting data from the database' });
        }finally{
            // End the session
            await session.endSession();
        }
          
        return res.status(200).json({
            message: `User ${id} is successfully deleted!`
        })
    },

    // login User
    loginUser: async (req, res) => {
        const { phone, password } = req.body;
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
        
        const token = jwt.sign({ phone, role: user.role, userId: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 })
        
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        res.send({ success: true, token });

        // return res.status(200).json({
        //     token,
        //     user
        // })
        // res.redirect('/api/users/profile')
    },

    // get users by role and school
    getRoleBasedUsers: async (req, res) =>{
        const { role, school } = req.body;
        let users;

        if (!role ||!school) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }

        try {
            users = await User.find({ role, school })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error retrieving data from the database' });
        }
        if (!users) {
            return res.status(400).json({ message: "No users found!" })
        }
        
        return res.status(200).json({ users })
    }
}

export default user;