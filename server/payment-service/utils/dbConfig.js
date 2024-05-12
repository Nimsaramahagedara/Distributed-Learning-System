import mongoose from "mongoose"; 

export const dbConfig = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('Database Connected on Payment Service !!');
        })
    } catch (error) {
        console.log(error);
    }
}