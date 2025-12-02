
import { deleteCloudFile } from "./cloud.js"

 export class AppError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode =statusCode
    }
}

export const globaleErrorHandling =async (err , req , res , next)=>{
   
    // rollback cloud image
    if(req.failImage){
       await deleteCloudFile(req.failImage.public_Id)
    }
    if(req.failImage?.lengt>0){
        for(const public_id of req.failImage){
            await deleteCloudFile(public_id)
        }
            
        }
     return res.status(err.statusCode || 500 ).json({
        message : err.message,
        success : false
     })

}