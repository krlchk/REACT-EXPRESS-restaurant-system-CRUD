import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { getUserByIdService } from "../../models/user-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getUserByIdService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a user by id", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "customer",
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: [mockUser],
    });

    const result = await getUserByIdService(mockUser.id);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = $1", [
      mockUser.id,
    ]);
    expect(result).toEqual(mockUser);
  });
});
