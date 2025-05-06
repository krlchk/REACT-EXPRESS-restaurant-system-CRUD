import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrderById,
  updateOrderbyId,
} from "../controllers/orders-controller";

const router = express.Router();

router.post("/create-order", authenticateToken, createOrder);
router.delete("/delete-order/:id", authenticateToken, deleteOrderById);
router.put("/update-order/:id", authenticateToken, updateOrderbyId);
router.get("/orders", authenticateToken, getAllOrders);
router.get("/orders/:id", authenticateToken, getOrderById);

export default router;
