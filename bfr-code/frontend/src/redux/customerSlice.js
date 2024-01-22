import { createSlice } from "@reduxjs/toolkit";
import { clearCustomerToken } from "../utils/localStorage";

const initialState = {
  customerInfo: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    login: (state, action) => {
      const { _id, name, phone, address, passWord } = action.payload;
      state.customerInfo = { _id, name, phone, address, passWord };
    },
    logout: (state) => {
      state.customerInfo = null;
      clearCustomerToken();
    },
    updateInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
  },
});

export const { login, logout } = customerSlice.actions;

export const updateInfo = (updatedInfo) => (dispatch) => {
  dispatch(customerSlice.actions.updateInfo(updatedInfo));
};

export default customerSlice.reducer;
