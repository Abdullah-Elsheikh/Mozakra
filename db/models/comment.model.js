import { model, Schema } from "mongoose";

const commentSchema = new Schema({
  courseId: { 
    type: Schema.Types.ObjectId,
     ref: "Course", 
     index: true,
      required: true },
  userId:   { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
  description: { type: String, trim: true }
},{timestamps:true})

export const Comment = model("Comment", commentSchema);