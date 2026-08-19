import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";

const protect = (req, res, next) => {
try {
    const token = req.cookies.token;

    if (!token) {
      return next(new AppError("Not authorized, no token", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    return next();
  } catch (error) {
    return next(new AppError("Not authorized, invalid token", 401));
  }
};

export default protect;
