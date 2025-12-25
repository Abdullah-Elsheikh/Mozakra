import { model, Schema } from "mongoose";

const listSchema = new Schema({
    name:{
    type:String,
    }
},{timestamps: true});

export const List = model("List",listSchema);