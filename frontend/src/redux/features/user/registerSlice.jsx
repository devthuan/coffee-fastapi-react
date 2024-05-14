import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    // {
    //   fullName: "Trần Phước Thuận",
    //   username: "0945986661",
    //   password: "12312"
    // },
  ],
  loading: false,
  error: [],
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    addInfoRegister: (state, action) => {
      state.data.push(action.payload);
    },
    removeInfoRegister: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addInfoRegister, removeInfoRegister, setLoading, setError } =
  registerSlice.actions;

export default registerSlice.reducer;
