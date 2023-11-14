import jwt from 'jsonwebtoken'

const auth = {
    authUser : async (req, res, next) => {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized! Token not provided'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        req.userId = decoded.userId
        req.userRole = decoded.role
        next()
    },
    // middleware to know if user have the right to view the requested student or not
    authRoleStudent: (req, res, next) =>{
        if(req.userRole!== "adminone"  && req.userRole !== "adminzero"){
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        next()
    }
}

export default auth;