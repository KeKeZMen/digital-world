import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import queryReducer from "./slices/querySlice"

const rootReducer = combineReducers({
  productReducer,
  queryReducer
});

export const store = configureStore({
  reducer: rootReducer,
});
