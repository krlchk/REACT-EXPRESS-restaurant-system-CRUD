import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ILoginResponse,
  ILoginResponseData,
  IRegisterResponse,
  IUser,
  IUserState,
} from "./user-types";
import axios from "axios";

export const registerUser = createAsyncThunk<
  IUser,
  { name: string; email: string; password: string }
>("register/registerUser", async ({ name, email, password }) => {
  const response = await axios.post<IRegisterResponse>(
    "http://localhost:5001/api/register-user",
    { name, email, password },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data.user;
});

export const loginUser = createAsyncThunk<
  ILoginResponseData,
  { email: string; password: string }
>("login/loginUser", async ({ email, password }) => {
  const response = await axios.post<ILoginResponse>(
    "http://localhost:5001/api/login-user",
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data.data;
});

const initialState: IUserState = {
  user: null,
  token: null,
  status: "idle",
  error: null as string | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReset: () => initialState,
    resetStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  //REGISTER
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to register";
    });
    //LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.user;
      //localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error?.message || "Failed to register";
    });
  },
});

export const { resetStatus, setUserReset } = userSlice.actions;
export default userSlice.reducer;
