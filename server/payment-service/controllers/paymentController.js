import { createTransaction, getAllTx, getAllUTx } from "../repository/transactionRepository.js";
import { createPayment } from "../utils/paymentService.js";

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
        const txdata = {
            userId: req?.query?.uid,
            productId: req?.query?.productId,
            qty: req?.query?.qty,
            price: req?.query?.price,
            name: req?.query?.name,
        }

        const tx = await createTransaction(txdata)
        const clientPaySucUrl = process.env.CLIENT_ADDRESS + '/payement-done'
        res.redirect(clientPaySucUrl);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllUserTx = async (req, res) => {
    try {
        const tx = await getAllUTx(req.params.uid)
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