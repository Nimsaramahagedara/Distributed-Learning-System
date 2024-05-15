import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    productId:{
        type:String,
        required:true,
    },
    qty:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    
},{
    timestamps:true
})

const TransactionModel = mongoose.model('transactions',transactionSchema)
export default TransactionModel;