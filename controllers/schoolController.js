import School from "../models/schoolModel.js";


//Get all schools
const getAllSchools = async (req, res, next) => {
    let schools;
    try {
        schools = await School.find();
    } catch (error) {
        return console.log(error)
    }
    if(!schools){
        return res.status(404).json({
            message: "No schools found"
        })
    }
    return res.status(200).json({schools})
}

//Creating new school
export const createSchool = async (req, res) => {
    const { name, propriatorname, headmastername, schoolline, location, email } = req.body;

    let exitingSchool;
    try {
        exitingSchool = await School.findOne({ schoolline , email });
    } catch (error) {
        return console.log(error)
    }
    if(exitingSchool){
        return res.status(400).json({
            message: "School already exists!"
        })
    }

    const newSchool = new School({
        name,
        propriatorname,
        headmastername,
        schoolline,
        location,
        email
    })
    try {
        await newSchool.save();
    } catch (error) {
        return console.log(error)
    }

    return res.status(201).json({
        message: `School named ${name} was created successfully`
    })
}

//Update existing school
export const updateSchool = async (req, res) => {
    const id = req.params.id
    const { name, propriatorname, headmastername, schoolline, location, email } = req.body;
    let school;

    try {
        school = await School.findByIdAndUpdate(id, {
            name,
            propriatorname,
            headmastername,
            schoolline,
            location,
            email
        });
    } catch (error) {
        return console.log(error)
    }

    if(!school){
        return res.status(404).json({
            message: "School not found"
        })
    }
    return res.status(200).json({school})
}

export const deleteSchool = async (req, res) => {
    const id = req.params.id
    let school;

    try {
        school = await School.findByIdAndDelete(id);
    } catch (error) {
        return console.log(error)
    }
    if(!school){
        return res.status(404).json({
            message: "School not found"
        })
    }
    return res.status(200).json({message: `School deleted successfully`, school})
}

// get school by id
export const getSchoolByID = async (req, res) => {
    const schoolID = req.params.id;

    let school;
    try {
        school = await School.findById(schoolID);
    } catch (error) {
        return console.log(error)
    }

    if(!school){
        return res.status(404).json({
            message: "School not found"
        })
    }

    return res.status(200).json({school})
}

export default getAllSchools;
