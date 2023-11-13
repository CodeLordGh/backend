import express from 'express';
import user from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRoute = express();

userRoute.get('/users', user.getAllusers)
userRoute.post('/users/new', user.createUser);


userRoute.delete('/users/delete/:id', user.deleteUser)
userRoute.post('/users/role', user.getRoleBasedUsers);
userRoute.get('/users/profile',auth.authUser, user.userProfile)
userRoute.get('/users/:id', user.getUserByID)
userRoute.post('/login', user.loginUser);

export default userRoute;