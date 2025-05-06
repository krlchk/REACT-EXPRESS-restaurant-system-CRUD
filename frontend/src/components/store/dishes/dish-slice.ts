import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ICartDish,
  ICreateDishResponse,
  ICreateOrderResponse,
  IDeleteDishResponse,
  IDish,
  IDishesState,
  IOrder,
  IResponseForDish,
  IResponseForOrder,
} from "./dish-types";
import axios from "axios";
import { RootState } from "../../../app/store";

export const fetchDishes = createAsyncThunk<
  IDish[],
  void,
  { state: RootState }
>("dishes/fetchDishes", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.restaurant.users.token;
  const response = await axios.get<IResponseForDish>(
    "http://localhost:5001/api/dishes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const fetchOrders = createAsyncThunk<
  IOrder[],
  void,
  { state: RootState }
>("orders/fetchOrders", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.restaurant.users.token;
  const response = await axios.get<IResponseForOrder>(
    "http://localhost:5001/api/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const createDish = createAsyncThunk<
  IDish,
  {
    name: string;
    description: string;
    price: number;
  },
  { state: RootState }
>("dishes/craeteDishes", async ({ name, description, price }, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.restaurant.users.token;
  const response = await axios.post<ICreateDishResponse>(
    "http://localhost:5001/api/create-dish",
    { name, description, price },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const createOrder = createAsyncThunk<
  IOrder,
  {
    user_id: number | undefined;
    status: "pending" | "failed" | "completed";
    dishes: ICartDish[];
    total_price: number;
  },
  { state: RootState }
>(
  "orders/createOrder",
  async ({ user_id, status, dishes, total_price }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.restaurant.users.token;
    const response = await axios.post<ICreateOrderResponse>(
      "http://localhost:5001/api/create-order",
      {
        user_id,
        status,
        dishes,
        total_price,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  },
);

export const deleteDish = createAsyncThunk<
  IDish,
  { id: number },
  { state: RootState }
>("dishes/deleteDish", async ({ id }, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.restaurant.users.token;
  const response = await axios.delete<IDeleteDishResponse>(
    `http://localhost:5001/api/delete-dish/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

const initialState: IDishesState = {
  dishes: [],
  orders: [],
  cartDishes: [],
  status: "idle",
  error: null as string | null,
};

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    setDishesReset: () => initialState,
    addToCart(state, action) {
      const existingDish = state.cartDishes.find(
        (dish) => dish.dish.id === action.payload.dish.id,
      );
      if (existingDish) {
        existingDish.amount += action.payload.amount;
      } else {
        state.cartDishes.push(action.payload);
      }
    },
    setNewAmount(state, action) {
      const { id, amount } = action.payload;
      const needDish = state.cartDishes.find((dish) => dish.dish.id === id);
      if (needDish) {
        needDish.amount = amount;
      }
    },
    removeFromCart(state, action) {
      state.cartDishes = state.cartDishes.filter(
        (dish) => dish.dish.id !== action.payload,
      );
    },
    resetCart(state) {
      state.cartDishes = [];
    },
  },
  extraReducers: (builder) => {
    //FETCH DISHES
    builder.addCase(fetchDishes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.dishes = action.payload;
    });
    builder.addCase(fetchDishes.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
    //FETCH ORDERS
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to fetch";
    });
  },
});

export const {
  addToCart,
  setDishesReset,
  setNewAmount,
  removeFromCart,
  resetCart,
} = dishesSlice.actions;
export default dishesSlice.reducer;
