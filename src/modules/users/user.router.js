import { Router } from "express";
import rateLimit from "express-rate-limit";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addUserByAdmin, addUsers, getUserById, login, updatePasswordByAdmin, updateUserByAdmin } from "./user.controller.js";
import { isAuthentication } from "../../middleware/authentication.js";
import { isAuthorization } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation.js";
import { LoginVal, UpdatePasswordByAdminVal } from "./user.validation.js";
import { roles } from "../../../utils/enum.js";


const userRouter = Router();

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

function adminKeyGuard(req, res, next) {
  const key = req.header("X-ADMIN-KEY");
  if (!key || key !== process.env.ADMIN_BOOTSTRAP_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
}
// add users
userRouter.post('/users',
    adminLimiter,
  adminKeyGuard,
  asyncHandler(addUsers)
);

//login 
userRouter.post('/login',
    isValid(LoginVal),
    asyncHandler(login)

);

// add user only admin
userRouter.post('/admin/users',
   isAuthentication(),
    isAuthorization([roles.ADMIN]),
    asyncHandler(addUserByAdmin)
);

// get user by id
userRouter.get('/users/:id',
  isAuthentication(),
  asyncHandler(getUserById)
);

// update password by admin
userRouter.put('/update-password',
  isAuthentication(),
  isAuthorization([roles.ADMIN]),
  isValid(UpdatePasswordByAdminVal),
  asyncHandler(updatePasswordByAdmin)
);

//upate user
userRouter.put('/users/:id',
  isAuthentication(),
  isAuthorization([roles.ADMIN]),
  asyncHandler(updateUserByAdmin)
);

export default userRouter;