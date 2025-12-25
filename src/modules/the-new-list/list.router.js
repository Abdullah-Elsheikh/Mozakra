import { Router } from "express";
import { uploudList } from "./list.controller.js";
import { isAuthentication } from "../../middleware/authentication.js";
import { isAuthorization } from "../../middleware/authorization.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { roles } from "../../../utils/enum.js";
import { cloudUpload } from "../../../utils/multer.js";

const listRouter = Router();

listRouter.post('/list-upload',
    isAuthentication(),
    isAuthorization([roles.ADMIN]),
    cloudUpload({allowTypes:['application/pdf']}).single('pdf'),
    asyncHandler(uploudList)


)

export default listRouter;