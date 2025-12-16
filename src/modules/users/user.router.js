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

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */
//login 
userRouter.post('/login',
    isValid(LoginVal),
    asyncHandler(login)

);
/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Add user by admin
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User added
 */
// add user only admin
userRouter.post('/admin/users',
   isAuthentication(),
    isAuthorization([roles.ADMIN]),
    asyncHandler(addUserByAdmin)
);

// get user by id
userRouter.get('/users/:id',
  isAuthentication(),
  isAuthorization([roles.STUDENT]),
  asyncHandler(getUserById)
);

/**
 * @swagger
 * /api/update-password:
 *   put:
 *     summary: Update password by admin
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Password updated
 */
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