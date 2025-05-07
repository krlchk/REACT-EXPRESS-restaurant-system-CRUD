import axios from "axios";
import { vi, describe, it, expect, Mocked } from "vitest";
import { deleteDish } from "../../components/store/dishes/dish-slice";
import { RootState } from "../../app/store";

vi.mock("axios");
const mockedAxios = axios as Mocked<typeof axios>;

describe("deleteDish", () => {
  it("should send DELETE and return the deleted dish", async () => {
    const mockResponse = {
      data: {
        data: {
          id: 10,
          name: "Test dish",
          price: 5,
          description: "Test",
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

    const thunk = deleteDish({ id: 10 });
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "http://localhost:5001/api/delete-dish/10",
      {
        headers: { Authorization: "Bearer test-token" },
      }
    );

    expect(result.payload).toEqual(mockResponse.data.data);
  });
});
