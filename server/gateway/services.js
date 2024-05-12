import dotenv from 'dotenv'
dotenv.config()
export const PAY_SERVICE = process.env.PAYMENT_SERVER_ADDRESS || 'http://localhost:5002'