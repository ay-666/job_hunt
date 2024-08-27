import { application } from "express";
import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
    }],
    salary:{
        val :{type:Number,required:true},
        salaryType:{type:String ,enum: ["LPA", "K/month"], required:true}
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Application',
    }]
},{timestamps:true});


const Job = mongoose.model('Job',jobSchema);

export default Job;