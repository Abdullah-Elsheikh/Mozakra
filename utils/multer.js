
// middleware/multerUploader.js
import multer from "multer";
import { AppError } from "../utils/appError.js";

const fileValidation = {
  image: ['image/jpeg', 'image/png'],
  file: ['application/pdf', 'application/msword'],
  video: ['video/mp4', 'video/webm'],
  audio: ['audio/mpeg', 'audio/wav']
};

export const cloudUpload = ({ allowTypes = fileValidation.file } = {}) => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (!allowTypes.includes(file.mimetype)) {
      return cb(new AppError("Invalid file format", 400), false);
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter });
};

