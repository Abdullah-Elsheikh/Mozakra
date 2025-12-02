import joi from "joi";
import { AppError } from "../../utils/appError.js";


export const generalFildes = {
  userName : joi.string().required().email(),
  firstName: joi.string().required().min(2).max(30),
  lastName: joi.string().required().min(2).max(30),
  email: joi.string().required().email(),
  password: joi.string() .required().pattern(/^[A-Z][A-Za-z0-9]{2,40}/),
  rePassword: joi.valid(joi.ref("newPassword")).required(),
  newPassword: joi.string() .required().pattern(/^[A-Z][A-Za-z0-9]{2,40}/),
  age: joi.number().min(8).max(70),
  industries: joi.array().items(joi.string()),
  workEnvironment: joi.string(),
  locationPreferences: joi.array().items(joi.string()),
  query: joi.string(),
  experience: joi.string(),
  provider: joi.string(),
  title: joi.string().min(5).max(100).required(),
  description: joi.string().min(5).max(100).required(), 
  id: joi.string(), 
  date: joi.date(),
  boolean: joi.boolean(),
  number: joi.number(),
  url: joi.string().uri(),
  phone: joi.string().pattern(/^[0-9]{10,14}$/),
  gender: joi.string().valid("male", "female", "other"),
  file: joi.object(),
  location: joi.string(),
  notes: joi.string(),
  basicSkills: joi.array().items(joi.string()),
  interests: joi.array().items(joi.string()),
  educationItem: joi.object({
    institution: joi.string().required(),
    degree: joi.string().required(),
    fieldOfStudy: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date(),
    description: joi.string(),
  }),

  experienceItem: joi.object({
    company: joi.string().required(),
    title: joi.string().required(),
    location: joi.string(),
    startDate: joi.date().required(),
    endDate: joi.date(),
    description: joi.string().required(),
  }),

  certificationItem: joi.object({
    name: joi.string().required(),
    issuer: joi.string().required(),
    date: joi.date(),
    url: joi.string().uri(),
  }),

  languageItem: joi.object({
    language: joi.string().required(),
    proficiency: joi.string().valid("beginner", "intermediate", "advanced", "native").required(),
  }),

  projectItem: joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    url: joi.string().uri(),
    technologies: joi.array().items(joi.string()),
  }),


  salaryRange: joi.object({
    min: joi.number(),
    max: joi.number(),
    currency: joi.string(),
  }),

  difficultyEnum: joi.string().valid("beginner", "intermediate", "advanced"),
  priorityEnum: joi.string().valid("high", "medium", "low"),
  jobTypeEnum: joi.string().valid("full-time", "part-time", "contract", "internship", "remote"),
  courseStatusEnum: joi.string().valid("saved", "in-progress", "completed", "abandoned"),
  jobStatusEnum: joi.string().valid("saved", "applied", "interviewed", "offered", "rejected", "accepted"),
  preferences: joi.array().items(joi.string()).required(),
};

export const isValid = (schema) => {
  return (req, res, next) => {
    let data = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const errr = [];
      error.details.forEach((err) => {
        errr.push(err.message);
      });
      return next(new AppError(errr, 400));
    }
    next();
  };
};
