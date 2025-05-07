import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { deleteDishByIdService } from "../../models/dishes-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("deleteDishByIdService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get a dish and delete it", async () => {
    const mockDish = {
      rows: [{ id: 1, name: "Pizza", price: 10, description: "Tasty" }],
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockDish
    );

    const result = await deleteDishByIdService(1);

    const payload = {
      rows: [],
    };

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM dishes WHERE id = $1 RETURNING *",
      [1]
    );

    expect(result).toEqual(mockDish.rows[0]);
  });
});
