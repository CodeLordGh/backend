const authUser = {
    isAdminone : async (req, res, next) => {
        if(req.user.role === 'admin'){
            next();
        }else{
            res.status(401).json({
                message: "You are not authorized to access this resource"
            })
        }
    }
}

export default authUser;