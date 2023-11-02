import express from 'express'
import schoolroutes from "./routes/schoolRoutes.js";
import env from 'dotenv';

env.config();

const app =  express();


app.use('/api/school', schoolroutes);

const port = process.env.PORT;


app.listen(port, () => console.log(`Listenning on http://localhost:${port}`))