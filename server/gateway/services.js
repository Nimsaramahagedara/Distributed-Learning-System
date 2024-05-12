import dotenv from 'dotenv'
dotenv.config()

//add the rest of the services addresses here;
export const COURSE_SERVICE = process.env.COURSE_SERVER_ADDRESS || 'http://localhost:5001'

export const PAY_SERVICE = process.env.PAYMENT_SERVER_ADDRESS || 'http://localhost:5002'

export const NOTI_SERVICE = process.env.NOTIFICATION_SERVICE_ADDRESS || 'http://localhost:5003'

export const USER_SERVICE = process.env.USER_SERVICE_ADDRESS || 'http://localhost:5004'
