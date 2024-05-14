import { createSlice } from "@reduxjs/toolkit";
import {
  UpdateQuantityCart,
  DeleteItemCartAPI,
} from "../../../services/UseServices";

const initialState = {
  totalData: 0,
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

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addTotalData: (state, action) => {
      state.totalData = action.payload;
    },
    addItem: (state, action) => {
      let existingItem = state.data.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        return;
      } else {
        state.data.push({ ...action.payload });
      }
    },
    removeItem: (state, action) => {
      async function removeItemInCart() {
        try {
          const res = await DeleteItemCartAPI(action.payload);
          // console.log(res);
        } catch (error) {
          console.error("Lỗi khi cập nhật số lượng trong giỏ hàng:", error);
        }
      }
      removeItemInCart();
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    removeAll: (state, action) => {
      state.data = [];
    },
    increasingQuantity: (state, action) => {
      let itemToUpdate = state.data.find(
        (item) => item.id === action.payload.cart_id
      );
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
      } else {
        console.log("không tìm thấy item");
      }
    },
    reduceQuantity: (state, action) => {
      let itemToUpdate = state.data.find(
        (item) => item.id === action.payload.cart_id
      );
      if (itemToUpdate && itemToUpdate.quantity === 1) {
        itemToUpdate.quantity = 1;
      } else if (itemToUpdate) {
        itemToUpdate.quantity -= 1;
      }
    },
    updateQuantity: (state, action) => {
      let itemToUpdate = state.data.find(
        (item) => item.id === action.payload.cart_id
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = action.payload.newQuantity;
        if (itemToUpdate.quantity < 1) {
          itemToUpdate.quantity = 1;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTotalData,
  addItem,
  removeItem,
  removeAll,
  increasingQuantity,
  reduceQuantity,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
