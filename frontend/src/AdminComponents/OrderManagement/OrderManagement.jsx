import { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrderManagement.module.scss";
import { format, isValid } from "date-fns";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemOrder,
  addItemOrder,
} from "../../redux/features/order/orderSlice";
import { addNewOrder } from "../../redux/features/order/orderStatisticSlice";
import { ToastContainer, toast } from "react-toastify";

import {
  setStatusOrderStatistic,
  updateQuantityStatusOrder,
} from "../../redux/features/order/orderStatisticSlice";
import {
  GetOrdersAPI,
  GetOrdersDetailAPI,
  UpdateStatusOrder,
} from "../../services/UseServices";

const cx = classNames.bind(styles);

const OrderManagement = () => {
  const dispatch = useDispatch();

  const dataBill = useSelector((state) => state.orderStatistic.data);
  const dataOrderProcessing = dataBill.filter(
    (order) => order.order_status === "Processing"
  );
  const menoizedDataOrder = useMemo(() => dataBill, [dataBill]);

  // calculate data pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataOrderProcessing.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleClickAccept = async (id) => {
    try {
      const res = await UpdateStatusOrder(id, "Successful");
      if (res && res.status === 200) {
        toast.success("Đã xác nhận đơn hàng thành công.");
      }
    } catch (error) {
      console.log(error);
    }

    dispatch(
      setStatusOrderStatistic({
        orderId: id,
        newStatus: "Successful",
      })
    );
    dispatch(removeItemOrder(id));
    dispatch(updateQuantityStatusOrder("Successful"));
  };

  const handleClickCancel = async (id) => {
    try {
      const res = await UpdateStatusOrder(id, "Failed");
      if (res && res.status === 200) {
        toast.success("Đã huỷ đơn hàng thành công.");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(
      setStatusOrderStatistic({
        orderId: id,
        newStatus: "Failed",
      })
    );
    dispatch(removeItemOrder(id));
    dispatch(updateQuantityStatusOrder("Failed"));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetOrdersAPI();
        if (res && res.status === 200 && res.data) {
          const dataRes = res.data.data.data;
          console.log(dataRes);
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
              order_details: item.order_details,
            };

            dispatch(addNewOrder(orderDetail));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (menoizedDataOrder.length === 0) {
      fetchAPI();
    }
  }, [dispatch, menoizedDataOrder]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Quản lý đơn hàng" />
        <div className={cx("group__bill")}>
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((product, index) => {
              return (
                <div key={index} className={cx("box__bill")}>
                  <div className={cx("id__bill")}>Hoá Đơn {product.id}</div>
                  <div className={cx("item__product")}>
                    {product.order_details.map((item, index2) => {
                      return (
                        <div key={index2} className={cx("box__product")}>
                          <div className={cx("box__img")}>
                            <img
                              className={cx("image__product")}
                              width={35}
                              height={73}
                              src={item.image_product}
                              alt=""
                            />
                          </div>
                          <div className={cx("box__info__product")}>
                            <p className={cx("name__product")}>
                              {item.name_product}
                            </p>
                            <p className={cx("option__product")}>
                              {item.classify}
                            </p>
                            <p className={cx("quantity__product")}>
                              X {item.quantity}
                            </p>
                            <p className={cx("price__product")}>
                              {parseInt(item.price).toLocaleString()} VNĐ
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={cx("box__information")}>
                    <h2 className={cx("title__infor")}>Thông tin</h2>
                    <ul className={cx("list__infor")}>
                      <li className={cx("item")}>
                        <p className={cx("item__title")}> tên </p>
                        <p className={cx("value")}>: {product.full_name}</p>
                      </li>
                      <li className={cx("item")}>
                        <p className={cx("item__title")}> Số điện thoại </p>
                        <p className={cx("value")}>: {product.phone_number}</p>
                      </li>
                      <li className={cx("item")}>
                        <p className={cx("item__title")}>Địa chỉ </p>
                        <p className={cx("value")}>
                          : {product.delivery_address}
                        </p>
                      </li>
                      <li className={cx("item")}>
                        <p className={cx("item__title")}>Thời gian </p>
                        <p className={cx("value")}>
                          :{" "}
                          {isValid(new Date(product.order_date))
                            ? format(
                                new Date(product.order_date),
                                "hh:mm, dd/MM/yyyy"
                              )
                            : ""}
                        </p>
                      </li>
                      <li className={cx("item")}>
                        <p className={cx("item__title")}>Tổng hoá đơn </p>
                        <p className={cx("value")}>
                          : {parseInt(product.total_payment).toLocaleString()}{" "}
                          VNĐ
                        </p>
                      </li>
                      <li className={cx("item")}>
                        <p className={cx("item__title")}>Phương Thức </p>
                        <p className={cx("value")}>
                          : {product.payment_methods}
                        </p>
                      </li>
                      <li className={cx("item")}>
                        <p className={cx("item__title")}>Trạng thái </p>
                        <p className={cx("value", "wait")}>
                          : {product.order_status}
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className={cx("box__btn")}>
                    <Button
                      onClick={() => handleClickAccept(product.id)}
                      className={cx("btn", "accept")}
                      text="Chấp Nhận"
                    />
                    <Button
                      onClick={() => handleClickCancel(product.id)}
                      className={cx("btn", "cancel")}
                      text="Huỷ"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <Title className={cx("message")} text="Không có đơn hàng nào..." />
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={dataOrderProcessing.length}
        onPageChange={handlePageChange}
      />
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

export default OrderManagement;
