import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    courseId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    contents:[
        {
            contentId:{
                type:String,
            },
            status:{
                type:Boolean,
                default:false
            }
        }
    ],
    status:{
        type:Boolean,
        default:false   //false = ongoing   /   true= completed
    }
}, { timestamps: true });

const ProgressModel = mongoose.model("progress", ProgressSchema);

export default ProgressModel;