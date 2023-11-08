import express from 'express';
import user from '../controllers/userController.js';

const userRoute = express();

userRoute.get('/users', user.getAllusers).post('/users', user.createUser);

userRoute.post('/login', user.loginUser);

export default userRoute;