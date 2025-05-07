import { describe, it, expect, vi } from "vitest";
import pool from "../../config/db";
import { createOrderService } from "../../models/order-model";

vi.mock("../../config/db", () => ({
    default: {
      query: vi.fn(),
    },
  }));

describe("createOrderService", () => {
  it("should insert order and return it", async () => {
    const user_id = 1;
    const status = "pending";
    const total_price = 35.5;
    const dishes = [
      { id: 1, name: "Pizza", price: 10 },
      { id: 2, name: "Burger", price: 8 },
    ];

    const mockCreatedOrder = {
      id: 123,
      user_id,
      status,
      total_price,
      dishes: JSON.stringify(dishes),
      created_at: new Date().toISOString(),
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: [mockCreatedOrder],
    });
    

    const result = await createOrderService(user_id, status, total_price, dishes);

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO orders (user_id, status, total_price, dishes, created_at) VALUES ($1 ,$2, $3, $4, $5) RETURNING *",
      expect.arrayContaining([
        user_id,
        status,
        total_price,
        JSON.stringify(dishes),
        expect.any(Date),
      ])
    );

    expect(result).toEqual(mockCreatedOrder);
  });
});
