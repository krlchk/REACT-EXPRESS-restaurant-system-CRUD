import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { deleteUserByIdService } from "../../models/user-model";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

describe("deleteUserByIdService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should delete a user by id and return it", async () => {
    const mockDeletedUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "customer",
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: [mockDeletedUser],
    });

    const result = await deleteUserByIdService(mockDeletedUser.id);

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [mockDeletedUser.id]
    );

    expect(result).toEqual(mockDeletedUser);
  });
});
