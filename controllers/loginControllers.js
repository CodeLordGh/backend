const login = (req, res, next) => {
    return res.status(200).json({ message: "You are loged in!" })
}
const create = (req, res, next) => {
    return res.json({ message: "Create an account!" })
}
export default {
    login,
    create
}