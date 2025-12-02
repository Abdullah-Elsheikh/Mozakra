import { Router } from "express";
import { isAuthentication } from "../../middleware/authentication.js";
import { isAuthorization } from "../../middleware/authorization.js";
import { roles } from "../../../utils/enum.js";
import { cloudUpload } from "../../../utils/multer.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteCourse, getAllCourses, getCourseById, uploudCourse } from "./course.controller.js";
import { get } from "mongoose";

const courseRouter = Router()

//add course by admin
courseRouter.post('/upload',
    isAuthentication(),
    isAuthorization([roles.ADMIN]),
    cloudUpload({allowTypes:['application/pdf']}).single('pdf'),
    asyncHandler(uploudCourse)


)

//get all courses
courseRouter.get('/course',
    asyncHandler(getAllCourses)
)


//get courses for student by id
courseRouter.get('/course/:id',
    isAuthentication(),
    isAuthorization([roles.STUDENT]),
    asyncHandler(getCourseById)
)

//delete course by admin
courseRouter.delete('/course/:id',
    isAuthentication(),
    isAuthorization([roles.ADMIN]),
    asyncHandler(deleteCourse) 
)

export default courseRouter;