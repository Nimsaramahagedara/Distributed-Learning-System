import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    fee:{
        type:Number,
        required:true,
    },
    instructorId:{
        type:String,
        required:true,
    }

}, { timestamps: true });

const CourseModel = mongoose.model("course", CourseSchema);

export default CourseModel;