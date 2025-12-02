import { Router } from "express";
import { isAuthentication } from "../../middleware/authentication.js";
import { isAuthorization } from "../../middleware/authorization.js";
import { roles } from "../../../utils/enum.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { createComment, deleteComment, getCommentById, updateComment } from "./comment.controller.js";

const commentRouter = Router();

// add comment 
commentRouter.post('/courses/:courseId/comment',
    isAuthentication(),
    isAuthorization([roles.STUDENT , roles.ADMIN]),
    asyncHandler(createComment)
)

//get comment 
commentRouter.get('/courses/:courseId/comments',
    isAuthentication(),
    isAuthorization([roles.STUDENT , roles.ADMIN]),
    asyncHandler(getCommentById)
)

//update comment
commentRouter.put('/comment/:id',
    isAuthentication(),
    isAuthorization([roles.STUDENT , roles.ADMIN]),
    asyncHandler(updateComment)
)

//delete comment
commentRouter.delete('/comment/:id',
    isAuthentication(),
    isAuthorization([roles.ADMIN , roles.STUDENT]),
    asyncHandler(deleteComment)
);

export default commentRouter;