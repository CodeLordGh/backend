import mongoose from 'mongoose';
import Student from '../models/studentModel.js'
import Grade from '../models/gradeModel.js';


function getGrade(score) {
    if (typeof score !== 'number' || score < 0 || score > 100) {
        throw new Error('Score must be a number between 0 and 100');
    }
    
    if (score >= 90) {
        return 'A';
    }
    else if (score >= 80) {
        return 'B';
    }
    else if (score >= 70) {
        return 'C';
    }
    else if (score >= 60) {
        return 'D';
    }
    else if (score >= 50) {
        return 'E';
    }
    
    return 'F';
}

const grade = {
    // middleware to add new grade to student and save the newly grade to the grade collection
    addGrade: async (req, res) => {
        const { studentId, score, subject } = req.body;
        let student;
        
        if (!studentId ||!score) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }

        try{
            student = await Student.findById(studentId)
            if (!student) {
                return res.status(400).json({ message: "Student not found!" })
            }
        }catch(error){
            return res.status(400).json({ message: "Student not found!" })
        }

        const grade = new Grade({
            score,
            studentId,
            subject,
            grades: getGrade(score)
        })
        
        try {
            const session = await mongoose.startSession();
            session.startTransaction();

            await grade.save({session})
            student.grades.push(grade._id);
            await student.save({session});

            await session.commitTransaction()
        }catch(error){
            await session.abortTransaction()
            console.log(error)
            return res.status(400).json({ message: "Error saving data to the database!" })
        }finally{
            await session.endSession()
        }
        return res.status(201).json({ message: "Grade is successfully added!" })
    },
    // middleware to get all grades of a student
    getAllGrades: async (req, res) => {
        const { studentId } = req.params;
        let student;
        
        if (!studentId) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }
        try{
            student = await Student.findById(studentId)
            if (!student) {
                return res.status(400).json({ message: "Student not found!" })
            }
        }catch(error){
            return res.status(400).json({ message: "Student not found!" })
        }
        return res.status(201).json(student.grades)
    },
    // middleware to get a grade of a student
    getGrade: async (req, res) => {
        const { studentId, subject } = req.params;
        let student;
        
        if (!studentId ||!subject) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }
        try{
            student = await Student.findById(studentId)
            if (!student) {
                return res.status(400).json({ message: "Student not found!" })
            }
        }catch(error){
            return res.status(400).json({ message: "Student not found!" })
        }
        return res.status(201).json(student.grades.find(grade => grade.subject === subject))
    },
    // middleware to update existing grade
    updateGrade: async (req, res) => {
        const { subject, score } = req.body;
        const gradeId = req.params
        
        if (!subject ||!score) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }
        
        if(!mongoose.Types.ObjectId.isValid(gradeId)){
            return res.status(400).json({ message: "Grade not found!" })
        }

        try{
            const grade = await Grade.findByIdAndUpdate(gradeId, {
                subject,
                score
            }, {new: true, timestamps: true})
            if (!grade) {
                return res.status(400).json({ message: "Grade not found!" })
            }
        }
        catch(error){
            return res.status(400).json({ message: "Grade not found!" })
        }
        return res.status(201).json(grade)
    },
    // middleware to delete existing grade
    deleteGrade: async (req, res) => {
        const gradeId = req.params
        
        if (!gradeId) {
            return res.status(400).json({ message: "All fields are mandatory!" })
        }
        
        if(!mongoose.Types.ObjectId.isValid(gradeId)){
            return res.status(400).json({ message: "Grade not found!" })
        }
        let grade;
        try{
            grade = await Grade.findByIdAndDelete(gradeId)
            if (!grade) {
                return res.status(400).json({ message: "Grade not found!" })
            }
        }catch(error){
            return res.status(400).json({ message: "Grade not found!" })
        }
        return res.status(201).json(grade)
    }
}

export default grade;