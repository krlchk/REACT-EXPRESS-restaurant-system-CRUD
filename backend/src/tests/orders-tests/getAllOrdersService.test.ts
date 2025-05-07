import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { getAllOrdersService } from "../../models/order-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getAllOrdersService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get all orders ", async () => {
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

    const result = await getAllOrdersService();

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM orders");

    expect(result[0]).toEqual(mockCreatedOrder);
  });
});
