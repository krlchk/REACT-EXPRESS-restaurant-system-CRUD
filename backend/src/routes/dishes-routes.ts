import express from "express";
import {
  createDish,
  deleteDishById,
  getAllDishes,
  getDishById,
} from "../controllers/dishes-controller";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/create-dish", authenticateToken, createDish);
router.delete("/delete-dish/:id", authenticateToken, deleteDishById);
router.get("/dishes", authenticateToken, getAllDishes);
router.get("/dishes/:id", authenticateToken, getDishById);

export default router;
