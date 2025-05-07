import axios from "axios";
import { vi, describe, it, expect, Mocked } from "vitest";
import { createOrder } from "../../components/store/dishes/dish-slice";
import { ICartDish } from "../../components/store/dishes/dish-types";
import { RootState } from "../../app/store";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("createOrder", () => {
  it("should send POST and return the order", async () => {
    const mockOrder = {
      data: {
        data: {
          id: 1,
          user_id: 1,
          status: "pending",
          dishes: [],
          total_price: 100,
        },
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockOrder);

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
      user_id: 1,
      status: "pending" as const,
      dishes: [] as ICartDish[],
      total_price: 100,
    };

    const thunk = createOrder(payload);
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:5001/api/create-order",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
      }
    );

    expect(result.payload).toEqual(mockOrder.data.data);
  });
});
