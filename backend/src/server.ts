import { Request, Response } from "express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pool from "./config/db";
import userRoutes from "./routes/user-router";
import dishesRoutes from "./routes/dishes-routes";
import ordersRoutes from "./routes/orders-route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", dishesRoutes);
app.use("/api", ordersRoutes);

app.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT current_database()");
    console.log("Database name:", result.rows[0].current_database);
    res.send(`The current database name is ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("Error quering database", error);
    res.status(500).send("Error retrieving database name");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
