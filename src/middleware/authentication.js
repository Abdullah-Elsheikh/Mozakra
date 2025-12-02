import jwt from 'jsonwebtoken';
import { User } from '../../db/models/user.model.js';

export const isAuthentication = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mozakra12345');
      const user = await User.findById(decoded._id).select('-password');
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.authUser = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
