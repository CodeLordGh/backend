import Studend from '../models/studentModel.js';

const getAllStudents = async (req, res) => {
    let students;

    try {
        students = await Studend.find()
    } catch (error) {
        return console.log(error)
    }
    if(!students){
        return res.status(404).json({
            message: 'No student found'
        })
    }
    return res.status(200).json({ students })
}


export default getAllStudents;