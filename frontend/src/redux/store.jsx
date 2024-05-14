import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import orderSlice from "./features/order/orderSlice";
import orderStatisticSlice from "./features/order/orderStatisticSlice";
import userSlice from "./features/user/userSlice";
import productSlice from "./features/product/productSlice";
import tokenSlice from "./features/login/tokenSlice";
import authSlice from "./features/user/authSlice";
import registerSlice from "./features/user/registerSlice";
import productManagement from "./features/product/productManagement";
import warehousesSlice from "./features/warehouses/warehousesSlice";
import supplierSlice from "./features/supplier/supplierSlice";
import statisticalSlice from "./features/statistical/statisticalSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    user: userSlice,
    register: registerSlice,
    orderStatistic: orderStatisticSlice,
    token: tokenSlice,
    auth: authSlice,
    productManager: productManagement,
    warehouse: warehousesSlice,
    supplier: supplierSlice,
    statistical: statisticalSlice
  },
});
