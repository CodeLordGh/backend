import express from 'express';
import getAllStudents, { createStudent, deleteStudent, getStudentById, updateStudent } from '../controllers/studentController.js';
import auth from '../middleware/auth.js';

const studentRoute = express.Router();

studentRoute.get('/',auth.authUser, getAllStudents)
studentRoute.post('/new',auth.authUser, auth.authRoleStudent, createStudent)
studentRoute.put('/update/:id',auth.authUser, auth.authRoleStudent, updateStudent)
studentRoute.delete('/delete/:id',auth.authRoleStudent, deleteStudent)
studentRoute.get('/:id',auth.authUser, auth.authRoleStudent, getStudentById)



export default studentRoute;