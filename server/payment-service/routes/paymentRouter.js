import express from 'express'
import { getAllTxs, getAllUserTx, getPayment, payementSuccess, payFail } from '../controllers/paymentController.js';
import { loginValidator } from '../middlewares/loginValidator.js';

const paymentRouter = express.Router()

paymentRouter.get('/all',getAllTxs)
paymentRouter.get('/paymentSuccess',payementSuccess)
paymentRouter.get('/paymentFail',payFail)
paymentRouter.get('/:id',getAllUserTx)
paymentRouter.post('/',loginValidator,getPayment)



export default paymentRouter;