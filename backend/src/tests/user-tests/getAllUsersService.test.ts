import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { getAllUsersService } from "../../models/user-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getAllUsersService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all users", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john.doe@example.com", role: "customer" },
      { id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "admin" },
    ];

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: mockUsers,
    });

    const result = await getAllUsersService();

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users");
    expect(result).toEqual(mockUsers);
  });
});
