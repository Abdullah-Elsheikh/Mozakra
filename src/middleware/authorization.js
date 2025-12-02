import { AppError } from "../../utils/appError.js";
import { messages } from "../../utils/messages.js";

export const isAuthorization = (roles = []) => {
  return (req, res, next) => {
    if (!req.authUser) {
      return next(new AppError(messages.auth.unauthorized, 401));
    }

    const userRoles = req.authUser.roles || [];

    const isAllowed = userRoles.some(role => roles.includes(role));

    if (!isAllowed) {
      return next(new AppError(messages.auth.unauthorized, 401));
    }

    return next();
  };
};
