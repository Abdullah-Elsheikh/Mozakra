
import path, { resolve } from 'path'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config({path : path.resolve('./config/.env')})
 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
 })
 export default cloudinary

 export const deleteCloudFile = async (public_id) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id, { resource_type: "raw" });
      console.log("File deleted from Cloudinary:", result);
      return result;
    } catch (err) {
      console.error("Error deleting file:", err);
      throw err;
    }

  };