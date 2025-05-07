import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db";
import { createUserService } from "../../models/user-model";
import bcrypt from "bcrypt";

vi.mock("../../config/db", () => ({
  default: {
    query: vi.fn(),
  },
}));

vi.mock("bcrypt", () => ({
    default: {
      hash: vi.fn().mockResolvedValue("mockedHashedPassword"),
    },
  }));

describe("createUserService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a user and return it", async () => {
    const mockCreatedUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "hashed-password",
      role: "customer",
    };

    (pool.query as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      rows: [mockCreatedUser],
    });

    const result = await createUserService(
      mockCreatedUser.name,
      mockCreatedUser.email,
      "password"
    );

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO users (name, email, password, role) VALUES ($1 ,$2, $3, 'customer') RETURNING *",
      [mockCreatedUser.name, mockCreatedUser.email, "mockedHashedPassword"]
    );

    expect(result).toEqual([mockCreatedUser]);
  });
});
