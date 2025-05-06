import { Request, Response } from "express";
import { handleResponse } from "../utils/response-handler";
import { logger } from "../utils/logger";
import { errorHandling } from "../middleware/error-handling";
import {
  createOrderService,
  deleteOrderByIdService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderByIdService,
} from "../models/order-model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user_id, status, total_price, dishes } = req.body;

    if (!user_id || !status || !total_price || !dishes) {
      return handleResponse(res, 400, "Missing required order fields");
    }

    const order = await createOrderService(
      user_id,
      status,
      total_price,
      dishes
    );
    logger.info(`New order created`);
    handleResponse(res, 201, "Order created successfully", order);
  } catch (err) {
    logger.error("Error in createOrder:", err);
    errorHandling(err, res);
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await getAllOrdersService();
    logger.info("Orders fetched successfully");
    handleResponse(res, 200, "Orders fetched successfully", orders);
  } catch (err) {
    logger.error("Error in getAllOrders");
    errorHandling(err, res);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdService(parseInt(id));

    if (!order) {
      handleResponse(res, 404, "Order not found");
      return;
    }
    logger.info("Order fetched successfully");
    handleResponse(res, 200, "Order fetched successfully", order);
  } catch (err) {
    logger.error("Error in getOrderById");
    errorHandling(err, res);
  }
};

export const updateOrderbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await updateOrderByIdService(parseInt(id), status);
    logger.info(`Order updated`);
    handleResponse(res, 200, "Order updated successfully", updatedOrder);
  } catch (err) {
    logger.error("Error in updateOrderbyId");
    errorHandling(err, res);
  }
};

export const deleteOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOrder = await deleteOrderByIdService(parseInt(id));

    if (!deletedOrder) {
      handleResponse(res, 404, "Order not found");
      return;
    }
    logger.info("Order deleted successfully");
    handleResponse(res, 200, "Order deleted successfully", deletedOrder);
  } catch (err) {
    logger.error("Error in deleteOrderById");
    errorHandling(err, res);
  }
};
