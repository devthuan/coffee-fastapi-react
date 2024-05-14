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
  data_order: [],
  listIngredient: [],
  listQuantity: [],
  loading: false,
  error: null,
};

export const WarehousesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    intiStatisticalData: (state, action) => {
      state.data = action.payload;
    },
    
    intiStatisticalOrder: (state, action) => {
      state.data_order = action.payload;
    },
    
   
  },
});

// Action creators are generated for each case reducer function
export const { intiStatisticalData, intiStatisticalOrder } = WarehousesSlice.actions;

export default WarehousesSlice.reducer;
