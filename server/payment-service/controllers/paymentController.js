import { createTransaction, getAllCTx, getAllTx, getAllUTx } from "../repository/transactionRepository.js";
import { createPayment } from "../utils/paymentService.js";
import axios from 'axios'
export const getPayment = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (!data?.userid || !data?.productId, !data?.qty || !data?.name || !data?.price) {
            throw Error('required fields are missing {userId,productId,name,price,qty }')
        }

        const payUrl = await createPayment(data.userid, data.productId, data.qty, data.price, data.name)

        res.status(200).json({payUrl : payUrl});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const payementSuccess = async (req, res) => {
    try {
        console.log('creating transaction...');
        const txdata = {
            userId: req?.query?.uid,
            productId: req?.query?.productId,
            qty: req?.query?.qty,
            price: req?.query?.price,
            name: req?.query?.name,
        }

        const tx = await createTransaction(txdata)
        const enrollment = {
            courseId: tx?.productId,
            userId:tx?.userId,
        }
        const resp = await axios.post(`${process.env.GATEWAY_ADDRESS}/learn`,enrollment)
        // console.log(tx);
        // console.log( process.env.CLIENT_ADDRESS);
        const clientPaySucUrl = process.env.CLIENT_ADDRESS + '/payment-done'
        res.redirect(clientPaySucUrl);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllUserTx = async (req, res) => {
    console.log(req.params.uid)
    try {
        const {userid} = req.body
        const tx = await getAllUTx(userid)
        res.status(200).json(tx)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllCourseTx = async (req, res) => {
    console.log(req.params.cid)
    try {
        const tx = await getAllCTx(req.params.cid)
        res.status(200).json(tx)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllTxs = async (req, res) => {
    console.log('Getting all txs');
    try {
        const tx = await getAllTx(req.params.uid)
        res.status(200).json(tx)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const payFail = async (req, res) => {
    const clientFailUrl = process.env.CLIENT_ADDRESS + '/payement-fail'
    res.redirect(clientFailUrl)
}