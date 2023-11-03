import express from 'express';
import getAllParents, { createParent, deleteParent, getParentById, updateParent } from '../controllers/parentController.js';

const parentRoutes = express.Router();

parentRoutes.get('/', getAllParents);

parentRoutes.post('/new', createParent);

parentRoutes.put('/update/:id', updateParent);

parentRoutes.delete('/delete/:id', deleteParent);

parentRoutes.get('/:id', getParentById);

export default parentRoutes;