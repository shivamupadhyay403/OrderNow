import { configureStore } from "@reduxjs/toolkit";
import verifyTokenSlice from "./store/verifyTokenSlice";
const store = configureStore({
  verifyToken: verifyTokenSlice,
});
export default store;
