import { combineReducers } from "@reduxjs/toolkit";
import dishesReducer from "./dishes/dish-slice";
import userReducer from "./users/user-slice";
import uiReducer from "./ui/ui-slice";

const rootReducer = combineReducers({
  dishes: dishesReducer,
  users: userReducer,
  ui: uiReducer,
});



export default rootReducer;
