import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { createDishService } from "../../models/dishes-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("createDishService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should insert a dish and return it", async () => {
    const mockDish = {
      rows: [{ id: 1, name: "Pizza", price: 10, description: "Tasty" }],
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockDish);

    const result = await createDishService("Pizza", 10, "Tasty");

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO dishes (name, price, description) VALUES ($1 ,$2, $3) RETURNING *",
      ["Pizza", 10, "Tasty"]
    );

    expect(result).toEqual(mockDish.rows);
  });
});
