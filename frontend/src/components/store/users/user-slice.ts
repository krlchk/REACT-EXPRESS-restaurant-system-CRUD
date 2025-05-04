import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./user-types";

const initialState: IUserState = {
  user: null,
  status: "idle",
  error: null as string | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
