import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalData: 0,
  data: [],
  loading: false,
  error: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.data = action.payload;
    },

    removeToken: (state, action) => {
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
