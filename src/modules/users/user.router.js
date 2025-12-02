import { Router } from "express";
import rateLimit from "express-rate-limit";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addUserByAdmin, addUsers, login, updatePasswordByAdmin } from "./user.controller.js";
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
userRouter.post('/admin/users',
    adminLimiter,
  adminKeyGuard,
  asyncHandler(addUsers)
);

//login 
userRouter.get('/login',
    isValid(LoginVal),
    asyncHandler(login)

);

// add user only admin
userRouter.post('/users',
   isAuthentication(),
    isAuthorization([roles.ADMIN]),
    asyncHandler(addUserByAdmin)
);

// update password by admin
userRouter.put('/update-password',
  isAuthentication(),
  isAuthorization([roles.ADMIN]),
  isValid(UpdatePasswordByAdminVal),
  asyncHandler(updatePasswordByAdmin)
)

export default userRouter;