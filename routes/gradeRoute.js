import express from 'express';
import grade from '../controllers/gradeController.js';
import auth from '../middleware/auth.js';

const gradeRoute = express.Router()

gradeRoute.post('/addGrade',auth.authUser, auth.authRoleTeacher, grade.addGrade)

gradeRoute.get('/getAllGrades/:studentId',auth.authUser, grade.getAllGrades)

gradeRoute.get('/getGrade/:studentId/:subject', grade.getGrade)

gradeRoute.put('/updateGrade/:gradeId', grade.updateGrade)

gradeRoute.delete('/deleteGrade/:gradeId', grade.deleteGrade)

export default gradeRoute;