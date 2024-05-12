import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    courseid:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:false,
    }

}, { timestamps: true });

const CourseContentModel = mongoose.model("courseContent", contentSchema);

export default CourseContentModel;