import axios from "axios";
import { vi, describe, it, expect, Mocked } from "vitest";
import { fetchOrders } from "../../components/store/dishes/dish-slice";
import { RootState } from "../../app/store";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("fetchOrders", () => {
  it("should send GET and return orders", async () => {
    const mockData = { data: { data: [{ id: 1, status: "pending" }] } };
    mockedAxios.get.mockResolvedValueOnce(mockData);

    const dispatch = vi.fn();
    const getState = (): RootState =>
      ({
        restaurant: {
          users: {
            token: "test-token",
          },
        },
      } as RootState);

    const thunk = fetchOrders();
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:5001/api/orders",
      { headers: { Authorization: "Bearer test-token" } }
    );

    expect(result.payload).toEqual(mockData.data.data);
  });
});
