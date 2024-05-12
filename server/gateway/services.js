import dotenv from 'dotenv'
dotenv.config()

//add the rest of the services addresses here;
export const PAY_SERVICE = process.env.PAYMENT_SERVER_ADDRESS || 'http://localhost:5002'

