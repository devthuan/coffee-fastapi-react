INSERT INTO permissions (code, name, description, url_api, method_api, type ) VALUES 

-- admin
("ADMIN","administrator", "administrator", "null", "null", "null"),

-- user
("CREATE_USER","create user", "tạo tài khoản ", "/api/v1/user", "POST", "POST"),
("GET_ALL_USER","get all user", "lấy tất cả người dùng", "/api/v1/users", "GET", "GET"),
("GET_USER_BY_ID","get user by id", "lấy người dùng theo id", "/api/v1/user", "GET", "GET"),
("UPDATE_ROLE_USER","update role user", "thay đổi quyền người dùng", "/api/v1/user", "PUT", "PUT"),
("DELETE_USER","delete user", "xoá tài khoản ", "/api/v1/user", "DELETE", "DELETE"),

-- product
("CREATE_PRODUCT","create product", "tạo tài khoản ", "/api/v1/product", "POST", "POST"),
("GET_ALL_PRODUCT","get all product", "lấy tất cả sản phẩm", "/api/v1/products", "GET", "GET"),
("GET_PRODUCT_BY_NAME","get product by name", "lấy sản phẩm theo tên", "/api/v1/product", "GET", "GET"),
("GET_PRODUCT_BY_ID","get product", "lấy sản phẩm theo id", "/api/v1/product", "GET", "GET"),
("UPDATE_PRODUCT","update  product", "cập nhật sản phẩm", "/api/v1/product", "PUT", "PUT"),
("DELETE_PRODUCT","delete product", "xoá sản phẩm ", "/api/v1/product", "PATCH", "PATCH"),

-- cart
("CREATE_CART","create cart", "tạo giỏ hàng ", "/api/v1/cart", "POST", "POST"),
("GET_ALL_CART","get all cart", "lấy tất cả giỏ hàng", "/api/v1/carts", "GET", "GET"),
("GET_CART_BY_USER_ID","get product by user id", "lấy tất cả giỏ hàng theo người dùng", "/api/v1/cart", "GET", "GET"),
("UPDATE_CART","update  cart", "cập nhật giỏ hàng", "/api/v1/cart", "PUT", "PUT"),
("DELETE_CART_BY_CART_ID","delete cart by cart id", "xoá giỏ item trong giỏ hàng ", "/api/v1/cart", "DELETE", "DELETE"),
("DELETE_CART_BY_CART_USER","delete cart by cart user id", "xoá tất cả giỏ hàng theo người dùng ", "/api/v1/cart", "DELETE", "DELETE"),

-- order
("CREATE_ORDER","create order", "tạo đơn hàng ", "/api/v1/order", "POST", "POST"),
("GET_ALL_ORDER","get all order", "lấy tất cả đơn hàng", "/api/v1/order-all", "GET", "GET"),
("GET_ORDER_BY_USER_ID","get order by user id", "lấy tất cả đơn hàng theo người dùng", "/api/v1/order", "GET", "GET"),
("UPDATE_STATUS_ORDER","update status order", "cập nhật trạng thái đơn hàng", "/api/v1/order-status/?new_status", "PATCH", "PATCH"),

-- warehouses
("CREATE_WAREHOUSES","create warehouses", "tạo nguyên liệu trong kho ", "/api/v1/warehouses", "POST", "POST"),
("GET_ALL_WAREHOUSES","get all warehouses", "lấy tất cả kho", "/api/v1/warehouses", "GET", "GET"),
("GET_WAREHOUSES_BY_NAME","get warehouses by user name", "tìm kiếm kho theo tên nguyên liệu", "/api/v1/warehouses", "GET", "GET"),
("UPDATE_WAREHOUSES","update warehouses", "cập nhật kho", "/api/v1/warehouses", "PUT", "PUT"),
("DELETE_WAREHOUSES","delete warehouses", "xoá nguyên liệu trong kho", "/api/v1/warehouses", "DELETE", "DELETE"),

-- supplier
("CREATE_SUPPLIER","create supplier", "tạo nhà cung cấp ", "/api/v1/supplier", "POST", "POST"),
("GET_ALL_SUPPLIER","get all supplier", "lấy tất cả  nhà cung cấp", "/api/v1/supplier", "GET", "GET"),
("GET_SUPPLIER_BY_NAME","get supplier by user name", "tìm kiếm tên nhà cung cấp", "/api/v1/supplier", "GET", "GET"),
("UPDATE_SUPPLIER","update supplier", "cập nhật nhà cung cấp", "/api/v1/supplier", "PUT", "PUT"),
("DELETE_SUPPLIER","delete supplier", "xoá nhà cung cấp", "/api/v1/supplier", "DELETE", "DELETE"),

-- statistical
("GET_REVENUE_STATISTICAL","statistical revenue", "thống kê doanh thu theo ngày", "/api/v1/statistical-revenue", "GET", "GET"),
("GET_ORDER_STATISTICAL","statistical order ", "thống kê đơn hàng theo các ngày trong tuần", "/api/v1/statistical-order", "GET", "GET")


-- role permission

insert into role_permission (role_id, permission_id)
-- admin ---------
(1, 1),

-- manager ---------

-- user
(2, 2),
(2, 3),
(2, 4),
-- (2, 5),
-- (2, 6),

-- product
(2, 7),
(2, 8),
(2, 9),
(2, 10),
-- (2, 11),
-- (2, 12),

-- cart
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17),
(2, 18),

-- order
(2, 19),
(2, 20),
(2, 21),
(2, 22),

-- warehouses
(2, 23),
(2, 24),
(2, 25),
-- (2, 26),
-- (2, 27),

-- supplier
(2, 28),
(2, 29),
(2, 30),
(2, 31),
-- (2, 32),

-- statistical
(3, 33),
(3, 34),

-- staff  ---------

-- user
(3, 2),
-- (3, 3),
-- (3, 4),
-- (3, 5),
-- (3, 6),

-- product
-- (3, 7),
(3, 8),
(3, 9),
(3, 10),
-- (3, 11),
-- (3, 12),

-- cart
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17),
(3, 18),

-- order
(3, 19),
(3, 20),
(3, 21),
(3, 22),

-- warehouses
-- (3, 23),
(3, 24),
(3, 25),
-- (3, 26),
-- (3, 27),

-- supplier
-- (3, 28),
(3, 29),
(3, 30),
-- (3, 31),
-- (3, 32),

-- statistical
-- (3, 33),
-- (3, 34),

-- client ---------

-- user
(4, 2),
-- (4, 3),
(4, 4),
-- (4, 5),
-- (4, 6),

-- product
-- (4, 7),
(4, 8),
(4, 9),
(4, 10),
-- (4, 11),
-- (4, 12),

-- cart
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(4, 17),
(4, 18),

-- order
(4, 19),
(4, 20),
(4, 21),
(4, 22),

-- warehouses
-- (4, 23),
-- (4, 24),
-- (4, 25),
-- (4, 26),
-- (4, 27),

-- supplier
-- (4, 28),
-- (4, 29),
-- (4, 30),
-- (4, 31),
-- (4, 32),

-- statistical
-- (4, 33),
-- (4, 34);


