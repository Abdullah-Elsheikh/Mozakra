import { Course } from "../../../db/models/course.model.js";
import { AppError } from "../../../utils/appError.js";
import cloudinary from "../../../utils/cloud.js";
import streamifier from "streamifier";

//uplod course by admin
const uploudCourse = async(req,res,next)=>{
  const { courseName , description } = req.body;                  
    
    const course = await Course.create({ courseName, description });

    const stream = cloudinary.uploader.upload_stream(
      { 
        resource_type: "raw",
         folder: "mozakar/courses",
         access_mode: "public",
         },
      
      async (err, result) => {
        console.error("Cloudinary error:", err);
        if (err) {
          console.error("Cloudinary upload error >>>", err);
          return next(new AppError("Cloud upload failed", 500));
        }
        course.pdfUrl = result.secure_url;
        course.pdfPublicId = result.public_id;
        await course.save();
        return res.status(200).json({ 
            id: course._id,
            courseName: course.courseName,
            description: course.description,
             pdfUrl: course.pdfUrl });
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
    
}

//get all courses 
const getAllCourses = async(req,res,next)=>{
    const courses = await Course.find()
    res.status(200).json({ courses });
}

//get course by id for student
const getCourseById = async(req,res,next)=>{
    const{id} = req.params;
    const course = await Course.findById(id).populate({path:"comments",select :" description -_id -courseId"});
    if(!course) return next(new AppError("Course not found",404));
    res.status(200).json({ 
        id: course._id,
        courseName: course.courseName,
        description: course.description,
         pdfUrl: course.pdfUrl,
          comments : course.comments
        });
         
}

//delete course by admin
const deleteCourse = async(req,res,next)=>{
    const{id} = req.params;
    const course = await Course.findById(id);
    if(!course) return next (new AppError("Course not found",404));

    //delete file from cloudinary
    await cloudinary.uploader.destroy( course.pdfPublicId , { resource_type: "raw" });
    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
}

export {uploudCourse,getCourseById,getAllCourses,deleteCourse};