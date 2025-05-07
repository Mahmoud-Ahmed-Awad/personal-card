import { configureStore, createStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
