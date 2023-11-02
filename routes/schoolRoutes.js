import express from "express";
import getAllSchools, { createSchool, deleteSchool, getSchoolByID, updateSchool } from "../controllers/schoolController.js";

const schoolroutes = express.Router()

schoolroutes.get('/', getAllSchools);
schoolroutes.post('/new', createSchool);
schoolroutes.put('/:id', updateSchool);
schoolroutes.get('/:id', getSchoolByID);
schoolroutes.delete('/:id', deleteSchool);

export default schoolroutes
