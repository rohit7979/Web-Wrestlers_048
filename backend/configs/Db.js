import mongoose from "mongoose";
import {} from 'dotenv/config.js';

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("connected MOngoDb");
    }catch(err){
        console.log(err);
    }
}

export default connectDB;

