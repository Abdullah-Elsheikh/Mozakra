// db/models/course.model.js
import mongoose, { Schema, model } from "mongoose";

const courseSchema = new Schema({
  courseName: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  pdfUrl: { type: String, default: null },
  pdfPublicId: { type: String, default: null }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual populate: كل تعليقات هذا الكورس عبر courseId
courseSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "courseId",
  justOne: false
});

export const Course = model("Course", courseSchema);
