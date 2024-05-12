import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import paymentRouter from './routes/paymentRouter.js'
import { dbConfig } from './utils/dbConfig.js'
import { loginValidator } from './middlewares/loginValidator.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
const PORT = process.env.PORT || 5002

app.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: 'Payment Server is up and running on port ' + PORT })
    } catch (error) {
        res.status(500).json({ message: error })
    }

})

app.use('/' ,paymentRouter)


app.get('*', async (req, res) => {
    try {
        res.status(200).json({ message: '404'})
    } catch (error) {
        res.status(500).json({ message: error })
    }

})

dbConfig().then(()=>{
    app.listen(PORT, () => {
        console.log(`Payment Service Started on port `, PORT);
    })    
}).catch(e=>console.log(e))
