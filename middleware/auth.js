const authUser = {
    isAdminone : async (req, res, next) => {
        const {role} = req.body
        if(role === 'adminone'){
            next();
        }else{
            res.status(401).json({
                message: "You are not authorized to access this resource"
            })
        }
    }
}

export default authUser;