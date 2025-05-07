import { describe, it, expect, vi } from "vitest";
import pool from "../../config/db";
import {
  createOrderService,
  updateOrderByIdService,
} from "../../models/order-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("updateOrderByIdService", () => {
  it("should update order and return it", async () => {
    const mockUpdatedOrder = {
      id: 123,
      user_id: 1,
      status: "completed",
      total_price: 35.5,
      dishes: JSON.stringify([
        { id: 1, name: "Pizza", price: 10 },
        { id: 2, name: "Burger", price: 8 },
      ]),
      created_at: "2024-01-01T00:00:00.000Z",
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: [mockUpdatedOrder],
    });

    const result = await updateOrderByIdService(
      mockUpdatedOrder.id,
      mockUpdatedOrder.status
    );

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [mockUpdatedOrder.status, mockUpdatedOrder.id]
    );

    expect(result).toEqual(mockUpdatedOrder);
  });
});
