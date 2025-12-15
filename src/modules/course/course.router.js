import { Router } from "express";
import { isAuthentication } from "../../middleware/authentication.js";
import { isAuthorization } from "../../middleware/authorization.js";
import { roles } from "../../../utils/enum.js";
import { cloudUpload } from "../../../utils/multer.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { deleteCourse, getAllCourses, getCourseById, uploudCourse } from "./course.controller.js";


const courseRouter = Router()
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Courses management
 */
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload course PDF (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Course uploaded
 */
//add course by admin
courseRouter.post('/upload',
    isAuthentication(),
    isAuthorization([roles.ADMIN]),
    cloudUpload({allowTypes:['application/pdf']}).single('pdf'),
    asyncHandler(uploudCourse)


)
/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 */

//get all courses
courseRouter.get('/course',
    asyncHandler(getAllCourses)
)
/**
 * @swagger
 * /api/course/{id}:
 *   get:
 *     summary: Get course by ID (Student only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course data
 */

//get courses for student by id
courseRouter.get('/course/:id',
    isAuthentication(),
    isAuthorization([roles.STUDENT]),
    asyncHandler(getCourseById)
)
/**
 * @swagger
 * /api/course/{id}:
 *   delete:
 *     summary: Delete course (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted
 */
//delete course by admin
courseRouter.delete('/course/:id',
    isAuthentication(),
    isAuthorization([roles.ADMIN]),
    asyncHandler(deleteCourse) 
)

export default courseRouter;