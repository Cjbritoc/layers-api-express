import { verifyToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../utils/errors.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided or token is malformed.');
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired token.');
  }
};

export const authentication = asyncHandler(authMiddleware);
