import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import {  getDishByIdService } from "../../models/dishes-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getDishByIdService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get a dish and return it", async () => {
    const mockDish = {
      rows: [{ id: 1, name: "Pizza", price: 10, description: "Tasty" }],
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockDish);

    const result = await getDishByIdService(1);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM dishes WHERE id = $1",
      [1]
    );

    expect(result).toEqual(mockDish.rows[0]);
  });
});
