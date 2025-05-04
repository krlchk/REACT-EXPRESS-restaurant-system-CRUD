import { Response } from "express";

export const errorHandling = (err: unknown, res: Response): void => {
  const statusCode = 500;
  const message = err instanceof Error ? err.message : "Something went wrong";
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    error: message,
  });
};
