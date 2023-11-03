import teacherModel from "../models/teacherModel.js";

// get all teachers
const getAllTeachers = async (req, res) => {

    let teachers
    try {
        teachers = await teacherModel.find();
    } catch (error) {
        res.status(500).json({error});
    }
    if (!teachers) {
        return res.status(400).json({ message: 'No teacher found!' })
    }
    res.status(200).json({teachers});
}

// get single teacher
export const getSingleTeacher = async (req, res) => {
    const { id } = req.params;
    let teacher

    try {
        teacher = await teacherModel.findById(id);
    } catch (error) {
        return res.status(500).json({error});
    }
    if (!teacher) {
        return res.status(400).json({ message: 'No teacher found!' })
    }
    return res.status(200).json({teacher});
}

// create teacher
export const createTeacher = async (req, res) => {
    const { name, phone, location } = req.body;
    let existingTeacher;
    try {
        existingTeacher = await teacherModel.findOne({ phone });
    } catch (error) {
        return res.status(500).json({error});
    }
    if (existingTeacher) {
        return res.status(400).json({ message: 'A teacher with this phone number already exists!' })
    }

    const teacher = new teacherModel({
        name,
        phone,
        location,
        password: 'sirep'
    });
    try {
        await teacher.save();
    } catch (error) {
        return res.status(500).json({error});
    }
    return res.status(201).json({teacher});
}

// update teacher
export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, phone, location } = req.body;
    let teacher;

    try {
        teacher = await teacherModel.findByIdAndUpdate(id, {
            name,
            phone,
            location
        })
    }catch (error) {
        return res.status(500).json({error});
    }
    if (!teacher) {
        return res.status(400).json({ message: 'No teacher found!' })
    }
    return res.status(200).json({teacher});
}

// delete teacher

export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    let teacher;

    try {
        teacher = await teacherModel.findByIdAndDelete(id);
    }catch (error) {
        return res.status(500).json({error});
    }
    if (!teacher) {
        return res.status(400).json({ message: 'No teacher found!' })
    }
    return res.status(200).json({message: "Teacher deleted successfully!",teacher});
}

export default getAllTeachers;