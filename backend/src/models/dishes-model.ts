import pool from "../config/db";

export const createDishService = async (
  name: string,
  price: number,
  description: string
) => {
  const result = await pool.query(
    "INSERT INTO dishes (name, price, description) VALUES ($1 ,$2, $3) RETURNING *",
    [name, price, description]
  );
  return result.rows;
};

export const getDishByNameService = async (name: string) => {
    const result = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
    return result.rows[0];
  };

export const getAllDishesService = async () => {
  const result = await pool.query("SELECT * FROM dishes");
  return result.rows;
};

export const getDishByIdService = async (id: number) => {
  const result = await pool.query("SELECT * FROM dishes WHERE id = $1", [id]);
  return result.rows[0];
};

export const deleteDishByIdService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM dishes WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
