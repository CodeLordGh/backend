
//get all AdminOnes
const getAllAdminOne = async (req, res) => {

    let adminOne;

    try {
        adminOne = await AdminOne.find();
    } catch (error) {
        res.json({error})
    }
    if (!adminOne) {
        return res.status(400).json({message: "No admin account found"})
    }
    return res.status(200).json({message: "AdminOne accounts retreived successfully", adminOne})
}


//create AdminOne

export const createAdminOne = async (req, res) => {
    const {name, location, phone} = req.body;

    let existingAdminOne;
    try {
        existingAdminOne = await AdminOne.findOne({phone})
    }catch(error){
        return res.json({error})
    }
    if (existingAdminOne) {
        return res.status(400).json({message: "AdminOne account already exists"})
    }
    const adminOne = new AdminOne({
        name,
        location,
        phone,
        password: 'sirep'
    })
    try {
        await adminOne.save();
    } catch (error) {
        res.json({error})
    }
    return res.status(201).json({message: "AdminOne account created successfully", adminOne})
}

//update AdminOne
export const updateAdminOne = async (req, res) => {
    const {id} = req.params;
    const {name, location, phone} = req.body;
    let admin;

    try {
        admin = await AdminOne.findByIdAndUpdate(id, {
            name,
            location,
            phone
        })
    } catch (error) {
        return res.json({error})
    }
    if (!admin) {
        return res.status(400).json({message: "No admin account found"})
    }
    return res.status(200).json({message: "AdminOne account updated successfully", admin})
}

//delete AdminOne

export const deleteAdminOne = async (req, res) => {
    const {id} = req.params;
    let admin;

    try {
        admin = await AdminOne.findByIdAndDelete(id)
    } catch (error) {
        return res.json({error})
    }
    if (!admin) {
        return res.status(400).json({message: "No admin account found"})
    }
    return res.status(200).json({message: "AdminOne account deleted successfully", admin})
}

//get singile admin one

export const getSingleAdminOne = async (req, res) => {
    const {id} = req.params;
    let admin;

    try {
        admin = await AdminOne.findById(id)
    } catch (error) {
        return res.json({error})
    }
    if (!admin) {
        return res.status(400).json({message: "No admin account found"})
    }
    return res.status(200).json({message: "AdminOne account retreived successfully", admin})
}

export default getAllAdminOne;