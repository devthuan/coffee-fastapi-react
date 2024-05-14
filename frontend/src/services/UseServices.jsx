import api from "./api";

export const LoginAPI = (email, password) => {
  return api.post(`/login`, { email, password });
};

export const CreateUserAPI = (user) => {
  return api.post(`/user`, user);
};

export const GetUser = (page) => {
  return api.get(`users`);
};
export const UpdateStatusAccount = (user_id) => {
  return api.patch(`user/active/${user_id}`);
};
export const UpdateInfoUser = (update_user, user_id) => {
  return api.patch(`user/${user_id}`, update_user);
};

export const SearchUser = (value) => {
  return api.get(`/user/?search=${value}`);
};

export const GetOrdersAPI = (page) => {
  return api.get(`order-all`);
};

export const GetOrdersByUserIdAPI = () => {
  return api.get(`order`);
};

export const GetOrdersDetailAPI = (order_id) => {
  return api.get(`order-detail/${order_id}`);
};
export const CreateProductAPI = async (product) => {
  const { name, price, file, category_id } = product;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("category_id", category_id);
  formData.append("price", price);
  formData.append("file", file);

  return api.post("product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UpdateProductAPI = async (product, product_id) => {
  const { name, price, file, category_id, quantity } = product;
  console.log(quantity);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("category_id", category_id);
  formData.append("price", price);
  formData.append("file", file);
  formData.append("quantity", quantity);
  return api.patch(`product/${product_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const GetProductAPI = (page) => {
  return api.get(`products?page=${page || 1}`);
};

export const SearchProduct = (value) => {
  return api.get(`product/?search=${value}`);
};

export const ProductChangeStatusAPI = (product_id) => {
  return api.patch(`/product/active/${product_id}`);
};

export const GetCartAPI = () => {
  return api.get("cart");
};
export const DeleteCartAPI = () => {
  return api.delete(`cart-all`);
};
export const DeleteItemCartAPI = (cart_id) => {
  return api.delete(`cart/${cart_id}`);
};
export const UpdateQuantityCart = (cart_id, quantity) => {
  return api.patch(`cart/${cart_id}?quantity=${quantity}`);
};

export const AddCartAPI = (product_id, quantity) => {
  return api.post(`cart`, { product_id, quantity });
};

export const UpdateStatusOrder = (order_id, order_status) => {
  return api.patch(`order-status/${order_id}?new_status=${order_status}`);
};

export const AddOrderAPI = (
  full_name,
  phone_number,
  delivery_address,
  payment_method,
  order_status,
  order_details
) => {
  return api.post(`order`, {
    full_name,
    phone_number,
    delivery_address,
    payment_method,
    order_status,
    order_details,
  });
};
export const AddOrderDetailAPI = (order_id, products) => {
  return api.post(`order-detail`, { order_id, products });
};

export const RegisterAPI = (email, password) => {
  return api.post(`user/`, {
    email,
    role_id: 1,
    password,
  });
};
export const ActivatingAccountAPI = (otp, email) => {
  return api.post(`activating-account`, {
    otp,
    email,
  });
};
export const ResendOTPAPI = (email) => {
  return api.post(`send-email`, {
    email,
  });
};

export const LogOut = () => {
  return api.post(`logout`, {});
};

export const AddItemCart = (product_id, quantity) => {
  return api.post(`cart/`, { product_id, quantity });
};

// warehouses

export const CreateWarehouses = (warehouse) => {
  return api.post(`warehouses`, warehouse);
};

export const GetWarehousesAPI = () => {
  return api.get(`warehouses`);
};

export const SearchWarehousesAPI = (search) => {
  return api.get(`warehouse/?search=${search}`);
};
export const StatisticalWarehousesAPI = () => {
  return api.get(`statistical-warehouse`);
};

export const UpdateWarehousesAPI = (warehouses_id, warehouse_update) => {
  return api.put(`warehouses/${warehouses_id}`, warehouse_update);
};

export const DeleteWarehouses = (warehouses_id) => {
  return api.delete(`warehouses/${warehouses_id}`);
};

// supplier
export const CreateSupplier = (supplier) => {
  return api.post(`supplier`, supplier);
};

export const GetAllSupplier = () => {
  return api.get(`supplier`);
};

export const SearchSupplierAPI = (search) => {
  return api.get(`suppliers/?search=${search}`);
};

export const UpdateSupplier = (supplier_id, supplier_update) => {
  return api.put(`supplier/${supplier_id}`, supplier_update);
};

// statistical

export const StatisticalRevenueAPI = () => {
  return api.get(`statistical-revenue`);
};
export const StatisticalOrderAPI = () => {
  return api.get(`statistical-order`);
};
