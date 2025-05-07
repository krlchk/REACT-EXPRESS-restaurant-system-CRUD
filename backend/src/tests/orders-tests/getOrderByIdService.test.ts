import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { getOrderByIdService } from "../../models/order-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getOrderByIdService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get a order and return it", async () => {
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

    const result = await getOrderByIdService(123);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM orders WHERE id = $1",
      [123]
    );

    expect(result).toEqual(mockCreatedOrder);
  });
});
