import { describe, expect, it, Mocked, vi } from "vitest";
import axios from "axios";
import { RootState } from "../../app/store";
import { createDish } from "../../components/store/dishes/dish-slice";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("createDish", () => {
  it("should send POST and return the dish", async () => {
    const mockDish = {
      data: {
        data: { id: 1, name: "Pizza", price: 10, description: "Yummy" },
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockDish);

    const dispatch = vi.fn();
    const getState = (): RootState =>
      ({
        restaurant: {
          users: {
            token: "test-token",
          },
        },
      } as RootState);

    const payload = {
      name: "Pizza",
      description: "Yummy",
      price: 10,
    };

    const thunk = createDish(payload);
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:5001/api/create-dish",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
      }
    );

    expect(result.payload).toEqual(mockDish.data.data);
  });
});
