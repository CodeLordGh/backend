import Student from '../models/studentModel.js';


//get all students
const getAllStudents = async (req, res) => {
    let students;

    try {
        students = await Student.find()
    } catch (error) {
        return console.log(error)
    }
    if(!students){
        return res.status(404).json({
            message: 'No student found'
        })
    }
    return res.status(200).json({ students })
}

//Create new Student
export const createStudent = async (req, res) => {
    const { firstname, lastname, level, dateofbirth } = req.body;
    let existingStudent;

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
        level
    })

    try {
        await student.save()
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
        })
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
        message: `Student ${firstname} ${lastname} is successfully updated!`
    })
}

//delete existing student
export const deleteStudent = async (req, res) => {
    const studentID = req.params.id;
    let student;

    try {
        student = await Student.findByIdAndDelete(studentID)
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
        message: "Student is successfully deleted!"
    })
}

// get student by id
export const getStudentById = async (req, res) =>{
    const studentID = req.params.id;
    let student;

    try {
        student = await Student.findById(studentID)
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
        message: "Student is successfully retrieved!",
        student
    })
}

export default getAllStudents;