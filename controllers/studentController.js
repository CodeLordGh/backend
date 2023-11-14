import Student from '../models/studentModel.js';
import User from '../models/userModel.js';
import School from '../models/schoolModel.js';
import mongoose from 'mongoose'

//get all students
const getAllStudents = async (req, res) => {
    let students;
    const userId = req.userId;
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Error getting user!"})
    }

    if (user.role === 'adminzero') {
        students = await Student.find({});
     } else if (['headmaster', 'adminone'].includes(user.role)) {
        students = await Student.find({ school: user.school });
     } else if (user.role === 'teacher') {
        students = await Student.find({
          teacher: user._id,
          class: { $in: user.classes },
        });
     } else if (user.role === 'parent') {
        students = await Student.find({ _id: { $in: user.children } });
     }
    
     res.status(200).json(students);
}

//Create new Student
export const createStudent = async (req, res) => {
    const { firstname, lastname, level, dateofbirth, parent, school } = req.body;
    let existingStudent;
    let existingSchool;
    let existingParent;

    if(!firstname || !lastname || !level || !dateofbirth || !parent || !school){
        return res.status(400).json({message: "All fields are required!"})
    }

    try{
        existingParent = await User.findById(parent)
        existingSchool = await School.findById(school)
    }catch(error){
        console.log(error)
        return res.json({message: "Error checking existing user or existing school!"})
    }

    try {
        existingStudent = await Student.findOne({ firstname, lastname })
    } catch (error) {
        return console.log(error);
    }
    if (existingStudent) {
        return res.status(400).json({ message: "Student already exist!" })
    }

    const student = new Student({
        firstname,
        lastname,
        dateofbirth,
        grades,
        school,
        parent,
        level
    })

    try {
        const session = await  mongoose.startSession();
        session.startTransaction();

        await student.save({session})
        existingParent.children.push(student._id);
        existingSchool.student.push(student._id);
        await existingSchool.save({session});
        await existingParent.save({session});

        await session.commitTransaction()

        await session.endSession()

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error saving data to the database"
        })
    }

    return res.status(201).json({
        message: `Student ${firstname} ${lastname} is successfully created!`
    })
}

//Update existing student
export const updateStudent = async (req, res) => {
    const studentID = req.params.id;
    const { firstname, lastname, level, dateofbirth } = req.body;
    let student;
    
    try {
        student = await Student.findByIdAndUpdate(studentID, {
            firstname,
            lastname,
            level,
            dateofbirth
        }, {new: true})
    } catch (error) {
        return res.status(404).json({ 
            message: "Error getting student from database!"
         })
    }
    if (!student) {
        return res.status(400).json({
            message: "No student found!"
        })
    }
    return res.status(201).json({
        message: `Student ${firstname} ${lastname} is successfully updated!`, student
    })
}

//delete existing student
export const deleteStudent = async (req, res) => {
    const studentID = req.params.id;
    let student;
    const linkedParent = await User.findOne({children: studentID})
    const linkedSchool = await School.findOne({students: studentID})

    try {
        const session = await mongoose.startSession()
        session.startTransaction();
        student = await Student.findByIdAndDelete(studentID)
        linkedParent.children.pull(studentID);
        linkedSchool.student.pull(studentID);
        await linkedSchool.save({session});
        await linkedParent.save({session});
        await session.commitTransaction()
    } catch (error) {

        await session.abortTransaction()

        console.log(error);
        return res.status(404).json({ 
            message: "Error performing operations in the database!"
         })
    }finally {// End session regardless of the outcome
        await session.endSession()
    }
    if (!student) {
        return res.status(400).json({
            message: "No student found!"
        })
    }
    return res.status(201).json({
        message: "Student is successfully deleted!"
    })
}

// get student by id
export const getStudentById = async (req, res) =>{
    const studentID = req.params.id;
    const userID = req.userId;
    let student;
    let user;


    try {
        user = await User.findById(userID)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ 
            message: "Error getting user from database!"
         })
    }


    if (user.role === 'adminzero') {
        student = await Student.findById(studentID)
        return res.status(201).json({
            message: "Student is successfully retrieved!",
            student
        })
    } else if (['headmaster', 'adminone'].includes(user.role)) {

        try {
            student = await Student.findById(studentID)
        
            if(student.school.toString() !== user.school.toString()){
                return res.status(400).json({
                    message: "You are not authorized to view this student!"
                })
            }
            return res.status(201).json({
                message: "Student is successfully retrieved!",
                student
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({ 
                message: "Error getting student from database!"
             })
        }

        
    } else if (user.role === 'teacher') {
        student = await Student.findById({_id: studentID, school: user.school})
        if(!user.classes.includes(student.level)){
            return res.status(400).json({
                message: "You are not authorized to view this student!"
            })
        }
        return res.status(201).json({
            message: "Student is successfully retrieved!",
            student
        })
    } else if (user.role === 'parent') {
        student = await Student.findById({_id: studentID, school: user.school})
        if(!user.children.includes(student._id)){
            return res.status(400).json({
                message: "You are not authorized to view this student!"
            })
        }
        return res.status(201).json({
            message: "Student is successfully retrieved!",
            student
        })
    }
    return res.status(404).json({
        message: "Student not found!"
    })
}

export default getAllStudents;