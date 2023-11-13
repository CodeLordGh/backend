import express from 'express';
import mongoose from 'mongoose';
import schoolroutes from "./routes/schoolRoutes.js";
import env from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import studentRoute from './routes/studentRoutes.js';
import userRoute from './routes/userRoute.js';


env.config();

const app =  express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use(session({
    secret: "nacHOlyt457BV",
    resave: false,
    saveUninitialized: true
    // cookie: {
    //     secure: true,
    //     maxAge: 1000 * 60 * 60 * 24,
    //     httpOnly: true,
    // },
}))

app.use('/api', userRoute)
app.use('/api/school', schoolroutes);
app.use('/api/student', studentRoute);


const dbpassword = process.env.DATABASEPASSWORD;
const port = process.env.PORT;

mongoose.connect(`mongodb+srv://babohmawuena12:${dbpassword}@cluster0.dwbqstc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`).then(
    () => app.listen(port)
).then(() => console.log(`Listenning on http://localhost:${port}`)).catch((error) => console.log(error))