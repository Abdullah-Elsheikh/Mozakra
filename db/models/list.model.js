import { model, Schema } from "mongoose";

const listSchema = new Schema({
    name:{
    type:String,
    },
     pdfUrl: { type: String, default: null },
  pdfPublicId: { type: String, default: null }
},{timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }});

export const List = model("List",listSchema);