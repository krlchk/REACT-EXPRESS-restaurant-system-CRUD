import axios from "axios";
import { vi, describe, it, expect, Mocked } from "vitest";
import { updateOrderStatus } from "../../components/store/dishes/dish-slice";
import { RootState } from "../../app/store";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("updateOrderStatus", () => {
  it("should send PUT and return the updated order", async () => {
    const mockResponse = {
      data: {
        data: {
          id: 2,
          status: "completed",
        },
      },
    };

    mockedAxios.put.mockResolvedValueOnce(mockResponse);

    const dispatch = vi.fn();
    const getState = (): RootState =>
      ({
        restaurant: {
          users: {
            token: "test-token",
          },
        },
      } as RootState);

    const thunk = updateOrderStatus({ id: 2, status: "completed" });
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      "http://localhost:5001/api/update-order/2",
      { status: "completed" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
      }
    );

    expect(result.payload).toEqual(mockResponse.data.data);
  });
});
