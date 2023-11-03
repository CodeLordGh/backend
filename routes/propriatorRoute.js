import express from 'express';
import getAllPropriators, { createPropriator, deletePropriator, getSinglePropriator, updatePropriator } from '../controllers/proprietorController.js';

const propriatorRoute = express.Router();

//get all propriators
propriatorRoute.get('/', getAllPropriators);

//get single propriator

propriatorRoute.get('/:id', getSinglePropriator);

//create new propriator

propriatorRoute.post('/new', createPropriator);

//update existing propriator

propriatorRoute.put('/update/:id', updatePropriator);

//delete existing propriator

propriatorRoute.delete('/delete/:id', deletePropriator);

export default propriatorRoute;