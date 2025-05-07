import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { getAllDishesService } from "../../models/dishes-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getAllDishesService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get all dishes ", async () => {
    const mockDish = {
      rows: [
        { id: 1, name: "Pizza", price: 10, description: "Tasty" },
        { id: 2, name: "Burger", price: 8, description: "Tasty" },
      ],
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockDish
    );

    const result = await getAllDishesService();

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM dishes");

    expect(result).toEqual(mockDish.rows);
  });
});
