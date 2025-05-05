import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ICreateDishResponse,
  IDeleteDishResponse,
  IDish,
  IDishesState,
  IResponseForDish,
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
      state.cartDishes = state.cartDishes.filter((dish) => dish.dish.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
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
  },
});

export const { addToCart, setDishesReset, setNewAmount, removeFromCart } =
  dishesSlice.actions;
export default dishesSlice.reducer;
