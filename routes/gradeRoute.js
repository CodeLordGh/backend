import express from 'express';
import grade from '../controllers/gradeController.js';

const gradeRoute = express.Router()

gradeRoute.post('/addGrade', grade.addGrade)

gradeRoute.get('/getAllGrades/:studentId', grade.getAllGrades)

gradeRoute.get('/getGrade/:studentId/:subject', grade.getGrade)

gradeRoute.put('/updateGrade/:gradeId', grade.updateGrade)

gradeRoute.delete('/deleteGrade/:gradeId', grade.deleteGrade)

export default gradeRoute;