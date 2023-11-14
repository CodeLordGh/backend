import jwt from 'jsonwebtoken'


const auth = {
    authUser : async (req, res, next) => {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized! token not provided'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        req.userClasses = decoded.userClasses
        req.userSubjects = decoded.userSubjects
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
    },
    // check login
    checkLogin: (req, res, next) => {
        if (req.cookies.token) {
           next();
        } else {
           res.send('Please login first.');
        }
    },
    // middleware to know if user has role of teacher and termine which classes he teaches in
    authRoleTeacher: (req, res, next) =>{
        if(req.userRole!== "teacher" || req.userRole !== 'adminzero'){
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        next()
    },
    // middleware to know if teacher intervain in a particular class and if teacher teaches that subject
    
}

export default auth;