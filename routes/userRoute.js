import express from 'express';
import user from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRoute = express();

userRoute.get('/users', user.getAllusers)
userRoute.post('/users/new', user.createUser);

userRoute.get('/users/:id', user.getUserByID)
userRoute.delete('/users/delete/:id', user.deleteUser)
userRoute.post('/users/role', user.getRoleBasedUsers);
userRoute.post('/users/profile', (req, res) => {
    res.json({message: "welcome"})
})

userRoute.post('/login', user.loginUser);

export default userRoute;