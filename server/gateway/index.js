import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import { createProxyMiddleware } from 'http-proxy-middleware'
import { PAY_SERVICE } from './services.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
const PORT = process.env.PORT || 5000

app.get('/', async (req, res) => {
    try {
       res.status(200).json({message:'Server is up and running on port '+ PORT})
    } catch (error) {
        res.status(500).json({message:error})
    }

})


app.use('/pay',createProxyMiddleware({
    target: PAY_SERVICE,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
 }))

app.listen(PORT, () => {
    console.log(`Proxy Server Started on port `, PORT);
})
