import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCake: [],
  data: [
    // {
    //   id: 1,
    //   name_product: "Cà Phê sữa Đen",
    //   price: 25000,
    //   image_product: ProductIMG,
    //   category: "cà phê",
    //   is_active: 1,
    // },
  ],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.data.push(action.payload);
    },
    addProductCake: (state, action) => {
      state.dataCake.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, addProductCake, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;
