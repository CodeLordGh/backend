import express from 'express';
import getAllAdminOne, { createAdminOne, deleteAdminOne, getSingleAdminOne, updateAdminOne } from '../controllers/adminOneController.js';

const adminOneRoute = express.Router();

adminOneRoute.get('/', getAllAdminOne);
adminOneRoute.get('/:id', getSingleAdminOne);
adminOneRoute.post('/new', createAdminOne);
adminOneRoute.put('/update/:id', updateAdminOne);
adminOneRoute.delete('/delete/:id', deleteAdminOne);

export default adminOneRoute;