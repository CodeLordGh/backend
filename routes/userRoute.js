import express from 'express';
import user from '../controllers/userController.js';

const userRoute = express();

userRoute.get('/users', user.getAllusers)
userRoute.post('/users/new', user.createUser);

userRoute.get('/users/role', user.getRoleBasedUsers);

userRoute.post('/login', user.loginUser);

export default userRoute;