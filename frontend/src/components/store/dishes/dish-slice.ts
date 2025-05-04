import { createSlice } from "@reduxjs/toolkit";
import { IDishesState } from "./dish-types";

const initialState: IDishesState = {
  dishes: [],
  orders: [],
};

export const dishesSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
});

export const {} = dishesSlice.actions;
export default dishesSlice.reducer;
