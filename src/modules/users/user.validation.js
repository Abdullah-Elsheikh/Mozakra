import joi from "joi";
import { generalFildes } from "../../middleware/validation.js";

export const LoginVal = joi.object({
    userName : generalFildes.userName.required(),
    password : generalFildes.password.required()
})

//update password by admin validation
export const UpdatePasswordByAdminVal = joi.object({
    userName : generalFildes.userName.required(),
    newPassword : generalFildes.newPassword.required(),
    rePassword : generalFildes.rePassword.required()
   
})