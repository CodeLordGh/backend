import jwt from 'jsonwebtoken'


const auth = {
    authUser : async (req, res, next) => {
        const ID = req.session.user
        console.log(req.session.user);

        // if (!ID) {
        //     return res.status(401).json({
        //         message: 'Unauthorized! ID not provided'
        //     })
        // }
        // const decoded = jwt.verify(ID, process.env.JWT_SECRET)
        // if (!decoded) {
        //     return res.status(401).json({
        //         message: 'Unauthorized'
        //     })
        // }
        // req.userId = decoded.userId
        // req.userRole = decoded.role
        // next()
        return ID
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
    }
}

export default auth;