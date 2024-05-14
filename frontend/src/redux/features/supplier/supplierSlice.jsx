import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    // {
    //   id: 1,
    //   product_id: 1,
    //   image_product: Image,
    //   name_product: "Cà phê đen",
    //   price: 25000,
    //   quantity: 1,
    // },
  ],
  loading: false,
  error: null,
};

export const SupplierSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    intiSupplierData: (state, action) => {
      state.data = action.payload;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { intiSupplierData } =
  SupplierSlice.actions;

export default SupplierSlice.reducer;
