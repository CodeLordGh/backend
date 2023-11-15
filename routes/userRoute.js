import express from 'express';
import user from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const userRoute = express();

userRoute.get('/users',auth.authUser, user.getAllusers)
userRoute.post('/users/new', user.createUser)


userRoute.delete('/users/delete/:id',auth.authUser, user.deleteUser)
userRoute.post('/users/role', auth.authUser, user.getRoleBasedUsers);
userRoute.get('/users/profile',auth.checkLogin, user.userProfile)
userRoute.get('/users/:id',auth.authUser, user.getUserByID)
userRoute.post('/login', user.loginUser);
userRoute.post('/logout', user.logoutUser)

export default userRoute;