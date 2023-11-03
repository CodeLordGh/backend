import express from 'express';
import getAllStudents, { createStudent, deleteStudent, getStudentById, updateStudent } from '../controllers/studentController.js';

const studentRoute = express.Router();

studentRoute.get('/', getAllStudents)
studentRoute.post('/new', createStudent)
studentRoute.put('/update/:id', updateStudent)
studentRoute.delete('/delete/:id', deleteStudent)
studentRoute.get('/:id', getStudentById)



export default studentRoute;