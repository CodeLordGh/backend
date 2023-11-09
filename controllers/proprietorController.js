
//get all propriators
const getAllPropriators = async (req, res) => {

    let propriator;

    try {
        propriator = await propriatorModel.find();
    } catch (error) {
        res.status(500).json(error);
    }
    if (!propriator) {
        return res.status(400).json({ message: "No propriator found!" })
    }

    res.status(200).json({ propriator });
}

//get single propriator

export const getSinglePropriator = async (req, res) => {

    const { id } = req.params;

    let propriator;

    try {
        propriator = await propriatorModel.findById(id);
    } catch (error) {
        res.status(500).json(error);
    }
    if (!propriator) {
        return res.status(400).json({ message: "No propriator found!" })
    }

    res.status(200).json({propriator});
}

//create new propriator
export const createPropriator = async (req, res) => {

    const { name, phone } = req.body;
    const propriatorId = req.params.id;
    let existingPropriator;

    try {
        existingPropriator = await propriatorModel.findById(propriatorId)
    } catch (error) {
        return res.json(error)
    }
    if (existingPropriator) {
        return res.status(400).json({ message: "Propriator already exists!" })
    }

    const propriator = new propriatorModel({
        name,
        phone,
        password: "sirep"
    })
    try {
        propriator.save()
    } catch (error) {
        return res.json(error)
    }
    res.status(201).json({propriator});
}

//update existing propriator

export const updatePropriator = async (req, res) => {

    const { id } = req.params;
    const { name, phone } = req.body;
    let propriator;

    try {
        propriator = await propriatorModel.findByIdAndUpdate(id, {
            name,
            phone
        })
    } catch (error) {
        return res.json(error)
    }
    if (!propriator) {
        return res.status(400).json({ message: "No propriator found!" })
    }
    res.status(201).json({propriator});
}

//delete existing propriator

export const deletePropriator = async (req, res) => {

    const { id } = req.params;
    let propriator;

    try {
        propriator = await propriatorModel.findByIdAndDelete(id)
    } catch (error) {
        return res.json(error)
    }
    if (!propriator) {
        return res.status(400).json({ message: "No propriator found!" })
    }
    res.status(201).json({propriator});
}

export default getAllPropriators;