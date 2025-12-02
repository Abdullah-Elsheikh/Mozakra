import { model, Schema } from "mongoose";

const lessonSchema = new Schema({
    courses : { type : Schema.Types.ObjectId , ref :'Course' },
    title :  String
    
},{timestamps:true})

export const Lesson = model("Lesson", lessonSchema);