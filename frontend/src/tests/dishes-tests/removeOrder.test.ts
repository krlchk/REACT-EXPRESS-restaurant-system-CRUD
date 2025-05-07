import axios from "axios";
import { vi, describe, it, expect, Mocked } from "vitest";
import { removeOrder } from "../../components/store/dishes/dish-slice";
import { RootState } from "../../app/store";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("removeOrder", () => {
  it("should send DELETE and return the removed order", async () => {
    const mockResponse = {
      data: {
        data: {
          id: 5,
          status: "pending",
        },
      },
    };

    mockedAxios.delete.mockResolvedValueOnce(mockResponse);

    const dispatch = vi.fn();
    const getState = (): RootState =>
      ({
        restaurant: {
          users: {
            token: "test-token",
          },
        },
      } as RootState);

    const thunk = removeOrder({ id: 5 });
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "http://localhost:5001/api/delete-order/5",
      { headers: { Authorization: "Bearer test-token" } }
    );

    expect(result.payload).toEqual(mockResponse.data.data);
  });
});
