import TransactionModel from "../models/Transaction.js"


export const createTransaction = async (transaction) => {
    try {
        const tx = await TransactionModel.create(transaction);
        return tx
    } catch (error) {
        return error
    }
}

export const getAllTx = async () => {
    try {
        const tx = await TransactionModel.find();
        return tx
    } catch (error) {
        return error
    }
}

export const getAllUTx = async (uid) => {
    try {
        const tx = await TransactionModel.find({userId:uid});
        return tx
    } catch (error) {
        return error
    }
}