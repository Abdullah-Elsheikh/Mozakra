import { Router } from "express";
import { isAuthentication } from "../../middleware/authentication.js";
import { isAuthorization } from "../../middleware/authorization.js";
import { roles } from "../../../utils/enum.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addNote, deleteNote, getNotes, updateNote } from "./note.controller.js";


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

//update Note   
noteRouter.put('/update-note/:noteId',
    isAuthentication(),
    isAuthorization([roles.STUDENT]),
    asyncHandler(updateNote)
)


//delete Note
noteRouter.delete('/delete-note/:noteId',
    isAuthentication(), 
    isAuthorization([roles.STUDENT]),
    asyncHandler(deleteNote)
)
export default noteRouter;