import { Request, Response } from "express";
import { handleResponse } from "../utils/response-handler";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByEmailService,
  getUserByIdService,
} from "../models/user-model";
import { logger } from "../utils/logger";
import { errorHandling } from "../middleware/error-handling";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await getUserByEmailService(email);

    if (userExists) {
      logger.info(`The user already exists: ${userExists.email}`);
      return handleResponse(res, 400, "The user already exists", userExists);
    }

    if (!password) {
      logger.info("Problems with your password");
      return handleResponse(res, 400, "Problems with your password");
    }

    const user = await createUserService(name, email, password);
    logger.info(`New user registered: ${email}`);
    handleResponse(res, 201, "User created successfully", user);
  } catch (err) {
    logger.error("Error in createUser:", err);
    errorHandling(err, res);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService(email);

    if (!user) {
      logger.info("Can not find user with this email");
      return handleResponse(res, 401, "Can not find user with this email");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      logger.info("The credentials are invalid");
      return handleResponse(res, 401, "The credentials are invalid");
    }

    const token = generateToken({ id: user.id, role: user.role });

    logger.info(`User is logged in: ${email}`);
    handleResponse(res, 201, "User logged in successfully", { token });
  } catch (err) {
    logger.error("Error in loginUser:", err);
    errorHandling(err, res);
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    logger.info("Users fetched successfully");
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    logger.error("Error in getAllUsers");
    errorHandling(err, res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(parseInt(id));

    if (!user) {
      handleResponse(res, 404, "User not found");
      return;
    }
    logger.info("User fetched successfully");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    logger.error("Error in getUserById");
    errorHandling(err, res);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserByIdService(parseInt(id));

    if (!deletedUser) {
      handleResponse(res, 404, "User not found");
      return;
    }
    logger.info("User deleted successfully");
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    logger.error("Error in getUserById");
    errorHandling(err, res);
  }
};
