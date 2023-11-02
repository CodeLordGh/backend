import express from 'express';
import getAllStudents from '../controllers/studentController';

const studentRoute = express.Router();

studentRoute.get('/', getAllStudents)




export default studentRoute;