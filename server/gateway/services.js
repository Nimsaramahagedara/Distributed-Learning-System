import dotenv from 'dotenv'
dotenv.config()

//add the rest of the services addresses here;
export const COURSE_SERVICE = process.env.COURSE_SERVER_ADDRESS

export const PAY_SERVICE = process.env.PAYMENT_SERVER_ADDRESS

export const NOTI_SERVICE = process.env.NOTIFICATION_SERVICE_ADDRESS

export const USER_SERVICE = process.env.USER_SERVICE_ADDRESS

export const LEARN_SERVICE = process.env.LEARN_SERVICE_ADDRESS
