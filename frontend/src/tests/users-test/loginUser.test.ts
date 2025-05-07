import { describe, expect, it, Mocked, vi } from "vitest";
import axios from "axios";
import { loginUser } from "../../components/store/users/user-slice";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("loginUser", () => {
  it("it should send POST and return user", async () => {
    const mockedUser = {
      data: {
        data: {
          email: "vitestuser@gmail.com",
          password: "qwerty",
        },
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockedUser);
    const dispatch = vi.fn();
    const payload = {
      email: "vitestuser@gmail.com",
      password: "qwerty",
    };

    const thunk = loginUser(payload);
    const result = await thunk(dispatch, () => undefined, undefined);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:5001/api/login-user",
      payload,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    expect(result.payload).toEqual(mockedUser.data.data);
  });
});
