import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import managerReducer from "./managerSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    manager: managerReducer,
  },
});
