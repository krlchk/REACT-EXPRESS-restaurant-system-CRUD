import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { getUserByEmailService } from "../../models/user-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("getUserByEmailService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a user by email", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "customer",
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: [mockUser],
    });

    const result = await getUserByEmailService(mockUser.email);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE email = $1", [
      mockUser.email,
    ]);
    expect(result).toEqual(mockUser);
  });
});
