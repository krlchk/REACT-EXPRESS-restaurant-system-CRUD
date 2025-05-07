import { describe, expect, it, Mocked, vi } from "vitest";
import axios from "axios";
import { RootState } from "../../app/store";
import { fetchDishes } from "../../components/store/dishes/dish-slice";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("fetchDishes", () => {
  it("should fetch dishes successfully", async () => {
    const fakeData = {
      data: {
        data: [{ id: 1, name: "Pizza", price: 10, description: "Nice" }],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(fakeData);

    const dispatch = vi.fn();
    const getState = () =>
      ({
        restaurant: {
          users: {
            token: "test-token",
          },
        },
      }) as RootState;

    const thunk = fetchDishes();
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:5001/api/dishes",
      { headers: { Authorization: "Bearer test-token" } },
    );

    expect(result.payload).toEqual(fakeData.data.data);
  });
});
