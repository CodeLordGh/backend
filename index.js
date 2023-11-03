import express from 'express';
import mongoose from 'mongoose';
import schoolroutes from "./routes/schoolRoutes.js";
import env from 'dotenv';
import studentRoute from './routes/studentRoutes.js';
import headmasterRoute from './routes/headmasterRoute.js';
import propriatorRoute from './routes/propriatorRoute.js';
import teacherRoutes from './routes/teacherRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import adminOneRoute from './routes/adminOneRoutes.js';


env.config();

const app =  express();

app.use(express.json());
app.use('/api/school', schoolroutes);
app.use('/api/student', studentRoute);
app.use('/api/headmaster', headmasterRoute);
app.use('/api/propriator', propriatorRoute);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/adminone', adminOneRoute);

const dbpassword = process.env.DATABASEPASSWORD;
const port = process.env.PORT;

mongoose.connect(`mongodb+srv://babohmawuena12:${dbpassword}@cluster0.dwbqstc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`).then(
    () => app.listen(port)
).then(() => console.log(`Listenning on http://localhost:${port}`)).catch((error) => console.log(error))