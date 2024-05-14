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
  listIngredient: [],
  listQuantity: [],
  loading: false,
  error: null,
};

export const WarehousesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    intiWarehousesData: (state, action) => {
      state.data = action.payload;
    },
    initListIngredientAndQuantity: (state, action) => {
      state.listIngredient = action.payload.ingredient_names;
      state.listQuantity = action.payload.quantity_per_units;
    },
  },
});

// Action creators are generated for each case reducer function
export const { intiWarehousesData, initListIngredientAndQuantity } =
  WarehousesSlice.actions;

export default WarehousesSlice.reducer;
