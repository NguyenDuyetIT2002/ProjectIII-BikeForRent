import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerReducer from "./customerSlice";
import managerReducer from "./managerSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCustomerReducer = persistReducer(persistConfig, customerReducer);
const persistedManagerReducer = persistReducer(persistConfig, managerReducer);

export const store = configureStore({
  reducer: {
    customer: persistedCustomerReducer,
    manager: persistedManagerReducer,
  },
});

export const persistor = persistStore(store);
