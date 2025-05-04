import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../components/store/root-reducer";

export const store = configureStore({
  reducer: {
    restaurant: rootReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
