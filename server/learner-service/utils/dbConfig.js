import mongoose from "mongoose";
const mongoUrl = 'mongodb+srv://nadundilshan733:tfgsk4VxVWMeNdr4@cluster0.z8f1cps.mongodb.net/learner-service?retryWrites=true&w=majority'

export const dbConfig = async()=>{
    try {
        await mongoose.connect(mongoUrl).then(()=>{
            console.log('Database Connected !!');
        })
    } catch (error) {
        console.log(error);
    }
}