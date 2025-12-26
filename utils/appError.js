
import { deleteCloudFile } from "./cloud.js"

 export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message)
        this.statusCode = statusCode
    }
}


export const globaleErrorHandling = async (err, req, res, next) => {

    // rollback cloud images
    if (Array.isArray(req.failImage) && req.failImage.length > 0) {
        for (const public_id of req.failImage) {
            await deleteCloudFile(public_id)
        }
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    })
}
