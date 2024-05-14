import { createSlice } from "@reduxjs/toolkit";
import {
  GetOrdersAPI,
  GetOrdersDetailAPI,
} from "../../../services/UseServices";

const initialState = {
  data: [
    // {
    //   id: 1,
    //   product: [
    //     {
    //       name_product: "Cà phê sữa đen",
    //       price: "25000.00",
    //       image_product:
    //         "http://localhost:8080/uploads/1696778547823-coffee-black.svg",
    //       quantity: 2,
    //     },
    //     {
    //       name_product: "Soda Nho",
    //       price: "25000.00",
    //       image_product:
    //         "http://localhost:8080/uploads/1696778508347-soda-nho.png",
    //       quantity: 3,
    //     },
    //   ],
    //   full_name: "John Doe",
    //   phone_number: "1234567890",
    //   delivery_address: "123 Main St",
    //   total_payment: "125000.00",
    //   order_date: "2023-10-07T07:30:00.000Z",
    //   payment_methods: "Credit Card",
    //   order_status: "Successful",
    // },
  ],
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItemOrder: (state, action) => {
      state.data.push(action.payload);
    },
    removeItemOrder: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    setStatusOrder: (state, action) => {
      const { orderId, newStatus } = action.payload;
      console.log(orderId, newStatus);

      state.data = state.data.map((item) =>
        item.id === orderId ? { ...item, order_status: newStatus } : item
      );

      // const orderToUpdate = state.data.find((item) => item.id === orderId);
      // if (orderToUpdate) {
      //   orderToUpdate.status = newStatus;
      // }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemOrder, removeItemOrder, setStatusOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
