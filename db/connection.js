import mongoose from "mongoose";

export const connectDB =()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB connected successfully")
    }).catch((error) => {
        console.error("DB connection failed:", error);
    });
}