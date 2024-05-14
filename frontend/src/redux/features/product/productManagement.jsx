import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  total_page: 0,
  limit: 0,
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
  name: "product-manager",
  initialState,
  reducers: {
    initDataProduct: (state, action) => {
      state.page = (action.payload.page);
      state.total_page = (action.payload.total_page);
      state.limit = (action.payload.limit);
      state.data = (action.payload.data);
    },
    setStatusProduct: (state, action) =>{
      const {productId, newStatus} = action.payload
      let productIndex = state.data.findIndex(item => item.id === productId)
      
      if(productId){
        state.data[productIndex].is_active = newStatus
      }
    },
    removeProduct: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { initDataProduct, removeProduct, setStatusProduct } =
  productSlice.actions;

export default productSlice.reducer;
