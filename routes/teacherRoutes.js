import express from 'express';
import getAllTeachers, { createTeacher, deleteTeacher, getSingleTeacher, updateTeacher } from '../controllers/teacherController.js';

const teacherRoutes = express.Router();

teacherRoutes.get('/', getAllTeachers);

teacherRoutes.get('/:id', getSingleTeacher);

teacherRoutes.post('/new', createTeacher);

teacherRoutes.put('/update/:id', updateTeacher);

teacherRoutes.delete('/delete/:id', deleteTeacher);

export default teacherRoutes;