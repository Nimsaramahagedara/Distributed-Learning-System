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
            _id:String,

            contentId:{
                type:String,
            },
            status:{
                type:Boolean,
                default:false
            },
            title: String,
            description: String,
            file: String,
            status: {
                type:Boolean,
                default:false
            },
            createdAt: Date,
            updatedAt: Date,
        }
    ],
    status:{
        type:Boolean,
        default:false   //false = ongoing   /   true= completed
    }
}, { timestamps: true });

const ProgressModel = mongoose.model("progress", ProgressSchema);

export default ProgressModel;