import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
dotenv.config();
import { dbConfig } from './utils/dbConfig.js';
import progressRouter from './routes/ProgressRouter.js';
import cors from 'cors';

const port = process.env.PORT || 5005;
const app = express();
app.use(express.json());

app.use(morgan('dev'));
app.use(cors());

app.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: 'Learner Server is up and running on port ' + port })
    } catch (error) {
        res.status(500).json({ message: error })
    }

})

//Progress Routes
app.use('/', progressRouter);

dbConfig().then(()=>{
    app.listen(port,()=>{
        console.log(`Learner Service running on port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})

