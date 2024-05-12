import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import { createProxyMiddleware } from 'http-proxy-middleware'
import { PAY_SERVICE, COURSE_SERVICE, USER_SERVICE, NOTI_SERVICE } from './services.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
const PORT = process.env.PORT || 5000

app.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: 'Proxy Server is up and running on port ' + PORT })
    } catch (error) {
        res.status(500).json({ message: error })
    }

})

app.use('/pay', createProxyMiddleware({
    target: PAY_SERVICE,
    changeOrigin: true,
}))

app.use('/course', createProxyMiddleware({
    target: COURSE_SERVICE,
    changeOrigin: true,
}))

app.use('/user', createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
}))

app.use('/notification', createProxyMiddleware({
    target: NOTI_SERVICE,
    changeOrigin: true,
}))

//Create other proxy addresses here


// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
    console.log(`Proxy Server Started on port `, PORT);
})
