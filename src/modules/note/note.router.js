import { Router } from "express";
import { isAuthentication } from "../../middleware/authentication.js";
import { isAuthorization } from "../../middleware/authorization.js";
import { roles } from "../../../utils/enum.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addNote, getNotes } from "./note.controller.js";


const noteRouter = Router();
//add Note
noteRouter.post('/add-note',
    isAuthentication(),
    isAuthorization([roles.STUDENT]),
    asyncHandler(addNote)
)

//get Notes
noteRouter.get('/get-notes',
    isAuthentication(),
    isAuthorization([roles.STUDENT]),
    asyncHandler(getNotes)
)

export default noteRouter;