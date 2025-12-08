import { model, Schema } from "mongoose";
import { roles } from "../../utils/enum.js";
//user schema
const userSchema = new Schema({
    userName :{
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true,
    },
    name:{
        type : String,
        trim : true,
    },
    phone :{
        type : String,
        trim : true,
    },
    password :{
        type : String,
        required: true,
        trim : true,
    },
    roles: {
        type:[String],
        enum: Object.values(roles),
    }
},{ timestamps:true })

export const User = model("User", userSchema);