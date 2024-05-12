import express from 'express'
import { getAllTxs, getAllUserTx, getPayment, payementSuccess, payFail } from '../controllers/paymentController.js';

const paymentRouter = express.Router()

paymentRouter.get('/',getAllTxs)
paymentRouter.get('/:id',getAllUserTx)
paymentRouter.get('/paymentSuccess',payementSuccess)
paymentRouter.get('/paymentFail',payFail)
paymentRouter.post('/',getPayment)



export default paymentRouter;