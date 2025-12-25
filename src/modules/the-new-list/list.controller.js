import { List } from "../../../db/models/list.model.js";
import { AppError } from "../../../utils/appError.js";
import cloudinary from "../../../utils/cloud.js";
import streamifier from "streamifier";

export const uploudList = async(req,res,next)=>{
  const { name } = req.body;                  
    
    const list = await List.create({ name });

    const stream = cloudinary.uploader.upload_stream(
      { 
        resource_type: "raw",
         folder: "mozakar/lists",
        //  format: "pdf",
         access_mode: "public"
         },
      
      async (err, result) => {
        console.error("Cloudinary error:", err);
        if (err) {
          console.error("Cloudinary upload error >>>", err);
          return next(new AppError("Cloud upload failed", 500));
        }
        list.pdfUrl = result.secure_url;
        list.pdfPublicId = result.public_id;
        await list.save();
        return res.status(200).json({ 
            id: list._id,
            name: list.name,
             pdfUrl: list.pdfUrl });
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
    
}