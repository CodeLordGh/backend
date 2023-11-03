import headMasterModel from "../models/headMasterModel.js";

//get all headmasters regardless of the school
const getAllHeadMasters = async ( req, res ) => {
    let headmasters;
    try {
        headmasters = await headMasterModel.find()
    } catch (error) {
        return console.log(error);
    }
    if (!headmasters) {
        return res.status(400).json({ message: "No headmaster found" })
    }
    return res.status(200).json({ headmasters })
}

//create headmaster account
export const createHeadMaster = async (req, res) => {
    const { name, email, phone, location } = req.body;
    let existingHeadmaster;

    try {
        existingHeadmaster = await headMasterModel.findOne({ phone })
    } catch (error) {
        return console.log(error);
    }
    if (existingHeadmaster) {
        return res.status(400).json({ message: "Headmaster already exist!" })
    }

    const headmaster = new headMasterModel({
        name,
        email,
        phone,
        location,
        password: 'sirep'
    })
    try {
        await headmaster.save()
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ message: "Headmaster created successfully!", headmaster })
}

// get headmaster by id
export const getHeadmasterById = async (req, res) => {
    const { id } = req.params;
    let headmaster;

    try {
        headmaster = await headMasterModel.findById(id)
    } catch (error) {
        return console.log(error);
    }
    if (!headmaster) {
        return res.status(400).json({ message: "Headmaster not found!" })
    }
    return res.status(200).json({ headmaster })
}

// update headmaster by id
export const updateHeadmasterById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, location } = req.body;
    let headmaster;

    try {
        headmaster = await headMasterModel.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            location
        })
    } catch (error) {
        return console.log(error);
    }
    if (!headmaster) {
        return res.status(400).json({ message: "Headmaster not found!" })
    }
    return res.status(200).json({ message: "Headmaster updated successfully!", headmaster })
}

// delete headmaster by id
export const deleteHeadmasterById = async (req, res) => {
    const { id } = req.params;
    let headmaster;

    try {
        headmaster = await headMasterModel.findByIdAndDelete(id)
    } catch (error) {
        return console.log(error);
    }
    if (!headmaster) {
        return res.status(400).json({ message: "Headmaster not found!" })
    }
    return res.status(200).json({ message: "Headmaster deleted successfully!", headmaster })
}

export default getAllHeadMasters;