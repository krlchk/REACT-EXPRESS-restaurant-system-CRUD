import pool from "../config/db";

export const createOrderService = async (
  user_id: number,
  status: string,
  total_price: number,
  dishes: any[]
) => {
  const createdAt = new Date();
  const result = await pool.query(
    "INSERT INTO orders (user_id, status, total_price, dishes, created_at) VALUES ($1 ,$2, $3, $4, $5) RETURNING *",
    [user_id, status, total_price, JSON.stringify(dishes), createdAt]
  );
  return result.rows[0];
};

export const getAllOrdersService = async () => {
  const result = await pool.query("SELECT * FROM orders");
  return result.rows;
};

export const getOrderByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateOrderByIdService = async (id: number, status: string) => {
  const result = await pool.query(
    "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

export const deleteOrderByIdService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM orders WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
