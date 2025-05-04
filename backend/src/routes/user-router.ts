import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
} from "../controllers/user-controller";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/register-user", createUser);
router.post("/login-user", loginUser);
router.delete("/delete-user/:id", authenticateToken, deleteUserById);
router.get("/users", authenticateToken, getAllUsers);
router.get("/users/:id", authenticateToken, getUserById);

export default router;
