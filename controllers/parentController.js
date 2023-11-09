
//get all parents

const getAllParents = async (req, res) => {
    let parents;

    try {
        parents = await Parent.find()
    } catch (error) {
        return console.log(error)
    }
    if(!parents){
        return res.status(404).json({
            message: 'No parent found'
        })
    }
    return res.status(200).json({ parents })
}

//Create new Parent

export const createParent = async (req, res) => {
    const { name, location, occupation, phone } = req.body;
    let existingParent;

    try {
        existingParent = await Parent.findOne({ phone })
    }catch( error ) {
        return res.json({error})
    }
    if (existingParent) {
        return res.status(400).json({ message: "Parent already exist!" })
    }
    const parent = new Parent({
        name,
        location,
        occupation,
        phone,
        password: 'sirep'
    })

    try {
        await parent.save()
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error saving data to the database"
        })
    }
    return res.status(201).json({
        message: `Parent ${name} is successfully created!`
    })
}

//Update existing parent

export const updateParent = async (req, res) => {
    const parentID = req.params.id;
    const { name, location, occupation, phone } = req.body;
    let parent;

    try {
        parent = await Parent.findByIdAndUpdate(parentID, {
            name,
            location,
            occupation,
            phone
        })
    } catch (error) {
        return res.status(404).json({ 
            message: "Error getting parent from database!"
         })
    }
    if (!parent) {
        return res.status(400).json({
            message: "No parent found!"
        })
    }
    return res.status(201).json({
        message: `Parent ${name} is successfully updated!`
    })
}

//delete existing parent

export const deleteParent = async (req, res) => {
    const parentID = req.params.id;
    let parent;

    try {
        parent = await Parent.findByIdAndDelete(parentID)
    } catch (error) {
        return res.status(404).json({ 
            message: "Error getting parent from database!"
         })
    }
    if (!parent) {
        return res.status(400).json({
            message: "No parent found!"
        })
    }
    return res.status(201).json({
        message: "Parent is successfully deleted!"
    })
}

// get parent by id

export const getParentById = async (req, res) =>{
    const parentID = req.params.id;
    let parent;

    try {
        parent = await Parent.findById(parentID)
    } catch (error) {
        return res.status(404).json({ 
            message: "Error getting parent from database!"
         })
    }
    if (!parent) {
        return res.status(400).json({
            message: "No parent found!"
        })
    }
    return res.status(201).json({
        message: "Parent is successfully retrieved!",
        parent
    })
}

export default getAllParents;