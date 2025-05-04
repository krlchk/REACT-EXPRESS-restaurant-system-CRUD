import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/response-handler";
import { errorHandling } from "./error-handling";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return handleResponse(res, 401, "Access denied. No token provided");
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    errorHandling(err, res);
  }
};
