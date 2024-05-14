import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  addItem,
  removeItem,
  removeAll,
  increasingQuantity,
  reduceQuantity,
  updateQuantity,
} from "../../../redux/features/cart/cartSlice";
import { addItemOrder } from "../../../redux/features/order/orderSlice";
import {
  GetCartAPI,
  AddOrderAPI,
  AddOrderDetailAPI,
  DeleteCartAPI,
  UpdateQuantityCart,
} from "../../../services/UseServices";
import Title from "../../../components/Title/Title";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

const cx = classNames.bind(styles);

const Cart = () => {
  const dispatch = useDispatch();
  const listItemCart = useSelector((state) => state.cart.data);
  const memoizedCartData = useMemo(() => listItemCart, [listItemCart]);
  const [newQuantity, setNewQuantity] = useState();
  const [fullName, setFullName] = useState();
  const [numberPhone, setNumberPhone] = useState();
  const [address, setAddress] = useState();

  let handlePlus = async (cart_id, quantity) => {
    try {
      const res = await UpdateQuantityCart(cart_id, quantity + 1);
      console.log(res);
      if (res && res.status === 200) {
        dispatch(increasingQuantity({ cart_id }));
      }
    } catch (error) {
      console.log(error.response.data);
      if (
        error.response.data.detail.data ===
        "400: {'status': 'error', 'code': 400, 'message': 'Product is out of stock.'}"
      ) {
        toast.error("Sản phẩm đã hết hàng.");
      }
    }
  };

  let handleMinus = async (cart_id, quantity) => {
    try {
      const res = await UpdateQuantityCart(cart_id, (quantity -= 1));
      if (res && res.status === 200) {
        dispatch(reduceQuantity({ cart_id }));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng trong giỏ hàng:", error);
    }
  };

  let handleDelete = (cart_id) => {
    dispatch(removeItem(cart_id));
  };

  let handleQuantityChange = (e, cart_id) => {
    setNewQuantity(parseInt(e.target.value));
    dispatch(
      updateQuantity({
        cart_id,
        newQuantity: parseInt(e.target.value),
      })
    );
  };

  let handleOrderBtn = async () => {
    if (fullName && numberPhone && address) {
      if (numberPhone.length !== 10) {
        toast.warning("Số điện thoại không hợp lệ", {
          theme: "dark",
          autoClose: 2000,
        });
        return;
      }
      const listProductInCart = [];
      const listProductInCartRedux = [];

      for (let product of listItemCart) {
        listProductInCart.push({
          product_id: product.product_id,
          quantity: product.quantity,
        });
        listProductInCartRedux.push({
          name_product: product.name_product,
          price: product.price,
          image_product: product.image_product,
          quantity: product.quantity,
          totalPayment: product.total_payment,
        });
      }

      let payment_method = "Thanh toán khi nhận hàng";
      let order_status = "Processing";

      const res = await AddOrderAPI(
        fullName,
        numberPhone,
        address,
        payment_method,
        order_status,
        listProductInCart
      );

      if (res && res.status === 200) {
        let order_id = res.data.data;

        const resDeleteCart = await DeleteCartAPI();
        if (resDeleteCart && resDeleteCart.status === 200) {
          toast.success("Đơn hàng của bạn đã được xác nhận");
          const orderDetail = {
            id: order_id,
            product: listProductInCartRedux,
            full_name: fullName,
            phone_number: numberPhone,
            delivery_address: address,
            total_payment: totalPrice,
            order_date: null,
            payment_methods: payment_method,
            order_status: order_status,
          };

          dispatch(addItemOrder(orderDetail));
          dispatch(removeAll());
        }
      }
    } else {
      toast.warning("Vui lòng nhập đầy đủ thông tin giao hàng", {
        theme: "dark",
        autoClose: 2000,
      });
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let totalPayment = 0;
    for (let item of listItemCart) {
      let amount = item.quantity || 1;
      let itemTotal = item.price * amount;
      totalPrice += itemTotal;
    }
    totalPayment = totalPrice + 15000;
    return { totalPrice, totalPayment };
  };

  const { totalPrice, totalPayment } = calculateTotalPrice();

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone_number");
    const parsedPhone = JSON.parse(storedPhone);
    setNumberPhone(parsedPhone);

    const fetchAPI = async () => {
      try {
        const res = await GetCartAPI();

        if (res && res.status === 200 && res.data) {
          const data = res.data.data;

          data.forEach((item) => {
            dispatch(
              addItem({
                id: item.cart_id,
                product_id: item.product_id,
                image_product: item.image_product,
                name_product: item.name_product,
                price: item.price,
                quantity: item.quantity,
              })
            );
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!memoizedCartData.length) {
      fetchAPI();
    }
  }, [dispatch, memoizedCartData]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        {listItemCart && listItemCart.length > 0 ? (
          <>
            <Title className={cx("title")} text="Giỏ hàng" />
            <table className={cx("table")}>
              <tbody className={cx("table__content")}>
                <tr className={cx("table__title")}>
                  <th className={cx("table__title-item")}>Sản phẩm</th>
                  <th className={cx("table__title-item")}>Đơn giá</th>
                  <th className={cx("table__title-item")}>Số lượng</th>
                  <th className={cx("table__title-item")}>Số tiền</th>
                  <th className={cx("table__title-item")}>Thao tác</th>
                </tr>
                {listItemCart.map((item, index) => {
                  return (
                    <tr key={index} className={cx("table__listItemCart")}>
                      <td className={cx("table__item")}>
                        <div className={cx("image__name-product")}>
                          <img
                            height={65}
                            className={cx("img_product")}
                            src={item.image_product}
                            alt=""
                          />
                          <p className={cx("name__product")}>
                            {item.name_product}
                          </p>
                        </div>
                      </td>
                      <td className={cx("table__item")}>
                        <p className={cx("price__product")}>
                          {item.price
                            ? parseInt(item.price).toLocaleString()
                            : "N/A"}
                        </p>
                      </td>
                      <td className={cx("table__item")}>
                        <div className={cx("amount")}>
                          <h1
                            className={cx("icon__minus")}
                            onClick={() => handleMinus(item.id, item.quantity)}
                          >
                            -
                          </h1>

                          <Input
                            className={cx("input__amount")}
                            type="text"
                            value={
                              newQuantity !== undefined
                                ? item.newQuantity
                                : item.quantity
                            }
                            onChange={(e) => handleQuantityChange(e, item.id)}
                          />

                          <h1
                            className={cx("icon__plus")}
                            onClick={() => handlePlus(item.id, item.quantity)}
                          >
                            +
                          </h1>
                        </div>
                      </td>
                      <td className={cx("table__item")}>
                        <p className={cx("total")}>
                          {(
                            item.price * item.quantity || item.price * 1
                          ).toLocaleString()}
                        </p>
                      </td>
                      <td className={cx("table__item")}>
                        <div className={cx("table__btn")}>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            className={cx("btn")}
                            text="Xoá"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={cx("checkOut")}>
              <div className={cx("group__address")}>
                <h2 className={cx("title__info")}>Thông tin Giao Hàng</h2>
                <div className={cx("name_num")}>
                  <div className={cx("label_input")}>
                    <label className={cx("label__title")} htmlFor="Input">
                      Họ và Tên
                    </label>
                    <Input
                      onChange={(e) => setFullName(e.target.value)}
                      className={cx("fullName")}
                      type="text"
                      placeholder="Họ và tên"
                    />
                  </div>

                  <div className={cx("label_input")}>
                    <label className={cx("label__title")} htmlFor="fullName">
                      Số điện thoại
                    </label>
                    <Input
                      onChange={(e) => setNumberPhone(e.target.value)}
                      readOnly
                      className={cx("NumPhone")}
                      type="text"
                      value={numberPhone}
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>

                <div className={cx("label_input")}>
                  <label className={cx("label__title")} htmlFor="fullName">
                    Địa chỉ giao hàng
                  </label>
                  <Input
                    onChange={(e) => setAddress(e.target.value)}
                    className={cx("address")}
                    type="text"
                    placeholder="Địa chỉ giao hàng"
                  />
                </div>
              </div>
              <div className={cx("group__totalPayment")}>
                <ul className={cx("list")}>
                  <li className={cx("item")}>
                    Tổng tiền hàng:
                    <p className={cx("item__number")}>
                      {totalPrice.toLocaleString()}
                    </p>
                  </li>
                  <li className={cx("item")}>
                    Phí vận chuyển:
                    <p className={cx("item__number")}> 15,000</p>
                  </li>
                  <li className={cx("item")}>
                    Tổng tiền thanh toán:
                    <p className={cx("item__number")}>
                      {totalPayment.toLocaleString()}
                    </p>
                  </li>
                </ul>
                <Button
                  onClick={() => handleOrderBtn()}
                  className={cx("order__btn")}
                  text="Đặt Hàng"
                />
              </div>
            </div>
          </>
        ) : (
          <Title
            className={cx("title")}
            text="Giỏ hàng của bạn đang còn trống"
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Cart;
