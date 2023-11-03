import express from 'express';
import getAllStudents, { createStudent, updateStudent } from '../controllers/studentController';

const studentRoute = express.Router();

studentRoute.get('/', getAllStudents)
studentRoute.post('/new', createStudent)
studentRoute.put('/update/:id', updateStudent)




export default studentRoute;