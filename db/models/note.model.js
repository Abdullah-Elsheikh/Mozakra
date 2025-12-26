import { model, Schema } from "mongoose";


const noteShema = new Schema({
    description:{
        type : String,
        trim : true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        
    }

},{timestamps:true})

export const Note = model("Note",noteShema);