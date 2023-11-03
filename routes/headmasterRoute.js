import express from 'express';
import getAllHeadMasters, { createHeadMaster, deleteHeadmasterById, getHeadmasterById, updateHeadmasterById } from '../controllers/headmasterController.js';

const headmasterRoute = express.Router()

headmasterRoute.get('/', getAllHeadMasters)
headmasterRoute.get('/:id', getHeadmasterById)
headmasterRoute.post('/new', createHeadMaster)
headmasterRoute.put('/update/:id', updateHeadmasterById)
headmasterRoute.delete('/delete/:id', deleteHeadmasterById)

export default headmasterRoute;