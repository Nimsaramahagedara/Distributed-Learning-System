import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import { dbConfig } from './utils/dbConfig.js';
import courseRouter from './routes/CourseRouter.js';
import contentRouter from './routes/CourseContentRoutes.js';
import cors from 'cors';

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
dotenv.config();
app.use(morgan('dev'));
app.use(cors());

//Course Routes
app.use('/', courseRouter);

//Content Routes
app.use('/content', contentRouter);

dbConfig().then(()=>{
    app.listen(port,()=>{
        console.log(`Course Management Service running on port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})

