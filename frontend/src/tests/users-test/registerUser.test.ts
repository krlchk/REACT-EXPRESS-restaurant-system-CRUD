import { describe, expect, it, Mocked, vi } from "vitest";
import axios from "axios";
import { registerUser } from "../../components/store/users/user-slice";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("registerUser", () => {
  it("it should send POST and response the user", async () => {
    const mockedUser = {
      data: {
        user: {
          name: "vitestUser",
          email: "vitestuser@gmail.com",
          password: "qwerty",
        },
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockedUser);
    const dispatch = vi.fn();
    const payload = {
      name: "vitestUser",
      email: "vitestuser@gmail.com",
      password: "qwerty",
    };

    const thunk = registerUser(payload);
    const result = await thunk(dispatch, () => undefined, undefined);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:5001/api/register-user",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    expect(result.payload).toEqual(mockedUser.data.user);
  });
});
