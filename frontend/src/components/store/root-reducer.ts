import { combineReducers } from "@reduxjs/toolkit";
import dishesReducer from "./dishes/dish-slice";
import userReducer from "./users/user-slice";

const rootReducer = combineReducers({
  dishes: dishesReducer,
  users: userReducer,
});

export default rootReducer;
