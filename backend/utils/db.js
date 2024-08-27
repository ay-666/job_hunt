import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected success")
    }catch(error){
        console.log(error);
    }
}

export default connectDB;