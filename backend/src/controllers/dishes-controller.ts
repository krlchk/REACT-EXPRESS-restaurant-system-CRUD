import { Request, Response } from "express";
import { handleResponse } from "../utils/response-handler";
import { createDishService, deleteDishByIdService, getAllDishesService, getDishByIdService, getDishByNameService } from "../models/dishes-model";
import { logger } from "../utils/logger";
import { errorHandling } from "../middleware/error-handling";

export const createDish = async (req: Request, res: Response) => {
  try {
    const { name, price, description  } = req.body;
    const dishExists = await getDishByNameService(name);

    if (dishExists) {
      logger.info(`The dish already exists: ${dishExists.name}`);
      return handleResponse(res, 400, "The dish already exists", dishExists);
    }

    const dish = await createDishService(name, price, description);
    logger.info(`New dish created: ${name}`);
    handleResponse(res, 201, "Dish created successfully", dish);
  } catch (err) {
    logger.error("Error in createUser:", err);
    errorHandling(err, res);
  }
};

export const getAllDishes = async (_req: Request, res: Response) => {
  try {
    const dishes = await getAllDishesService();
    logger.info("Dishes fetched successfully");
    handleResponse(res, 200, "Dishes fetched successfully", dishes);
  } catch (err) {
    logger.error("Error in getAllDishes");
    errorHandling(err, res);
  }
};

export const getDishById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dish = await getDishByIdService(parseInt(id));

    if (!dish) {
      handleResponse(res, 404, "Dish not found");
      return;
    }
    logger.info("Dish fetched successfully");
    handleResponse(res, 200, "Dish fetched successfully", dish);
  } catch (err) {
    logger.error("Error in getDishById");
    errorHandling(err, res);
  }
};

export const deleteDishById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedDish = await deleteDishByIdService(parseInt(id));

    if (!deletedDish) {
      handleResponse(res, 404, "Dish not found");
      return;
    }
    logger.info("Dish deleted successfully");
    handleResponse(res, 200, "Dish deleted successfully", deletedDish);
  } catch (err) {
    logger.error("Error in deleteDishById");
    errorHandling(err, res);
  }
};
