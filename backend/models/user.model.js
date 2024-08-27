import mongoose from "mongoose";

const userShcema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true 
    },
    phoneNumber:{
        type:Number,
        required:true,
        validate:{
            validator: v=> v.toString().length <= 10,
            message: props => "Enter 10 digit number"
        }
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        profilePic:{type:String,default:""},
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeName:{type:String},
        company:{type: mongoose.Schema.Types.ObjectId, ref:'Company'},
    },

},{timestamps:true});

const User = mongoose.model('User',userShcema);
export default User;