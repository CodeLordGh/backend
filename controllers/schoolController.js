// import schoolModel from "../models/schoolModel";

const getAllSchools = (req, res, next) => {
    res.send('This logs all the schools in the database!');
}

export const createSchool = (req, res) => {
    res.send(`This creates a new school`)
}

export const updateSchool = (req, res) => {
    const id = req.params.id
    res.send(`This updates scholl's data with the ID ${id}`)
}

export const deleteSchool = (req, res) => {
    const id = req.params.id
    res.send(`This deletes a school with the ID ${id}`)
}

export const getSchoolByID = (req, res) => {
    const id = req.params.id
    res.send(`This finds a school by it's ID ${id}`)
}

export default getAllSchools;
