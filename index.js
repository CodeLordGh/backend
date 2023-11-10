import express from 'express';
import mongoose from 'mongoose';
import schoolroutes from "./routes/schoolRoutes.js";
import env from 'dotenv';
import studentRoute from './routes/studentRoutes.js';
import userRoute from './routes/userRoute.js';


env.config();

const app =  express();

app.use(express.json());

app.use('/api', userRoute)
app.use('/api/school', schoolroutes);
app.use('/api/student', studentRoute);


const dbpassword = process.env.DATABASEPASSWORD;
const port = process.env.PORT;

mongoose.connect(`mongodb+srv://babohmawuena12:${dbpassword}@cluster0.dwbqstc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`).then(
    () => app.listen(port)
).then(() => console.log(`Listenning on http://localhost:${port}`)).catch((error) => console.log(error))