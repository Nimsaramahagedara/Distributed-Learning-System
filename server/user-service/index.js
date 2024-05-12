import express from 'express';
import dotenv from 'dotenv';
import { dbConfig } from './utils/dbconfig.js';
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT || 3000
const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.status(200).json({message:"User Service is up and running"})
})	

app.use('/', userRouter)


dbConfig();

app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}🚀`);
});
