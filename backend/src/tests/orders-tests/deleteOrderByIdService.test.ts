import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { deleteOrderByIdService } from "../../models/order-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("deleteOrderByIdService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete a order", async () => {
    const mockDeletedOrder = {
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
      rows: [mockDeletedOrder],
    });

    const result = await deleteOrderByIdService(mockDeletedOrder.id);

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
    [mockDeletedOrder.id]
    );

    expect(result).toEqual(mockDeletedOrder);
  });
});
