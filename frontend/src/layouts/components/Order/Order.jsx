import classNames from "classnames/bind";
import stylesOrder from "./Order.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemOrder,
  addItemOrder,
} from "../../../redux/features/order/orderSlice";
import { setStatusOrderStatistic } from "../../../redux/features/order/orderStatisticSlice";
import { setStatusOrder } from "../../../redux/features/order/orderSlice";
import Title from "../../../components/Title/Title";
import Button from "../../../components/Button/Button";
import Filter from "../../../components/Filter/Filter";
import { useEffect, useMemo, useState } from "react";
import {
  GetOrdersByUserIdAPI,
  UpdateStatusOrder,
} from "../../../services/UseServices";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(stylesOrder);

const Order = () => {
  const dispatch = useDispatch();
  const dataOrders = useSelector((state) => state.order.data);
  const menoizedDataOrder = useMemo(() => dataOrders, [dataOrders]);

  // Filter order by status order
  const [filterCategory, setFilteredCategory] = useState("");
  const initialCategories = ["Successful", "Failed", "Processing"];
  const filteredOrders = filterCategory
    ? dataOrders.filter((order) => order.order_status === filterCategory)
    : dataOrders;

  const handleFilterChange = (category) => {
    setFilteredCategory(category);
  };

  let handleDelete = async (itemId) => {
    try {
      const res = await UpdateStatusOrder(itemId, "Failed");
      if (res && res.status === 200) {
        toast.success("Đã huỷ đơn hàng thành công.");
        dispatch(
          setStatusOrder({
            orderId: itemId,
            newStatus: "Failed",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(
      setStatusOrderStatistic({
        orderId: itemId,
        newStatus: "Failed",
      })
    );
    // dispatch(removeItemOrder(itemId));
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetOrdersByUserIdAPI();
        if (res && res.status === 200 && res.data) {
          const dataRes = res.data.data;
          console.log(dataRes)
          for (const item of dataRes) {
            const orderDetail = {
              id: item.id,
              full_name: item.full_name,
              phone_number: item.phone_number,
              delivery_address: item.delivery_address,
              total_payment: item.total_payment,
              order_date: item.order_date,
              payment_methods: item.payment_methods,
              order_status: item.order_status,
              product: item.order_details,
            };

            dispatch(addItemOrder(orderDetail));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!menoizedDataOrder.length) {
      fetchAPI();
    }
  }, [dispatch, menoizedDataOrder]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Đơn hàng" />
        <Filter
          titleLabel={"Lọc đơn hàng theo:"}
          categories={initialCategories}
          onFilterChange={handleFilterChange}
        />
        {filteredOrders && filteredOrders.length > 0 ? (
          <>
            <table className={cx("table")}>
              <tbody className={cx("table__content")}>
                <tr className={cx("table__title")}>
                  <th className={cx("table__title-item")}>Sản phẩm</th>

                  <th className={cx("table__title-item")}>Số tiền</th>
                  <th className={cx("table__title-item")}>
                    thông tin người nhận
                  </th>
                  <th className={cx("table__title-item")}>Trạng thái</th>
                  <th className={cx("table__title-item")}>Thao tác</th>
                </tr>
                {filteredOrders.map((order, index) => {
                  return (
                    <tr key={index} className={cx("table__items")}>
                      <td className={cx("table__item")}>
                        {order.product.map((item, indexOrder) => {
                          return (
                            <div
                              key={indexOrder}
                              className={cx("image__name-product")}
                            >
                              <img
                                height={65}
                                className={cx("img_product")}
                                src={item.image_product}
                                alt=""
                              />
                              <div className={cx("box__infoProduct")}>
                                <div className={cx("box__detail")}>
                                  <p className={cx("name__product")}>
                                    {item.name_product}
                                  </p>
                                  <div className={cx("amount")}>
                                    <p className={cx("quantity__product")}>
                                      X {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p className={cx("price__product")}>
                                  {parseInt(item.price).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td className={cx("table__item")}>
                        <p className={cx("total")}>
                          {parseInt(order.total_payment).toLocaleString()}
                        </p>
                      </td>
                      <td className={cx("table__item")}>
                        <div className={cx("box__info")}>
                          <p className={cx("text__name")}>{order.full_name},</p>
                          <p className={cx("text__numberPhone")}>
                            {order.phone_number},
                          </p>
                          <p className={cx("text__address")}>
                            {order.delivery_address}
                          </p>
                        </div>
                      </td>
                      <td className={cx("table__item")}>
                        <div className={cx("table__btn")}>
                          <Button
                            className={cx("btn", {
                              successful: order.order_status === "Successful",
                              failed: order.order_status === "Failed",
                              pending: order.order_status === "Processing",
                            })}
                            text={order.order_status}
                          />
                        </div>
                      </td>
                      <td className={cx("table__item")}>
                        <div className={cx("table__btn")}>
                          {order.order_status === "Processing" ? (
                            <Button
                              onClick={() => handleDelete(order.id)}
                              className={cx("btn", "cancel")}
                              text="Huỷ"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <Title
            className={cx("title")}
            text="Không có đơn hàng nào đang xử lý"
          />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Order;
