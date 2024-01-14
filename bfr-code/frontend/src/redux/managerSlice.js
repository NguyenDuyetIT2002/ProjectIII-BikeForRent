import { createSlice } from "@reduxjs/toolkit";
import { clearManagerToken } from "../utils/localStorage";

const initialState = {
  managerInfo: null,
};

export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    login: (state, action) => {
      const { _id } = action.payload;
      state.managerInfo = { _id };
    },
    logout: (state) => {
      state.managerInfo = null;
      clearManagerToken();
    },
  },
});

export const { login, logout } = managerSlice.actions;

export default managerSlice.reducer;
