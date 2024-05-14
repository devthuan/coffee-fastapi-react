import classNames from "classnames/bind";
import styles from "./OrderStatistics.module.scss";
import styleDashboard from "../Dashboard/Dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { format, isValid } from "date-fns";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/Filter/Filter";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetOrdersAPI } from "../../services/UseServices";
import { addOrderStatistic } from "../../redux/features/order/orderStatisticSlice";
import { useMemo, useState } from "react";

const cx = classNames.bind(styles);
const cxDashboard = classNames.bind(styleDashboard);

const OrderStatistics = () => {
  const dispatch = useDispatch();
  const dataOrder = useSelector((state) => state.orderStatistic.data);
  const dataOrderSuccessful = useSelector(
    (state) => state.orderStatistic.success
  );
  const dataOrderFailed = useSelector((state) => state.orderStatistic.failed);
  const dataOrderProcessing = useSelector(
    (state) => state.orderStatistic.processing
  );
  const memoizedOrderData = useMemo(() => dataOrder, [dataOrder]);

  // filter category
  const [filteredCategory, setFilteredCategory] = useState("");
  const initialCategories = ["Successful", "Failed", "Processing"];
  const filteredOrders = filteredCategory
    ? dataOrder.filter((product) => product.order_status === filteredCategory)
    : dataOrder;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = (category) => {
    setFilteredCategory(category);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetOrdersAPI();
        if (res && res.status === 200 && res.data) {
          const data = res.data.data;
          const totalData = data.total_items;
          let success = 0,
            failed = 0,
            processing = 0;
          let totalSales = 0;
          for (const item of data.data) {
            if (item.order_status === "Successful") {
              success += 1;
              totalSales += parseFloat(item.total_payment);
            } else if (item.order_status === "Failed") {
              failed += 1;
            } else if (item.order_status === "Processing") {
              processing += 1;
            }
          }
          dispatch(
            addOrderStatistic({
              data: data.data,
              totalData,
              totalSales,
              success,
              failed,
              processing,
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (memoizedOrderData.length === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedOrderData]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Thống kê đơn hàng" />
        <div className={cxDashboard("box__statistical")}>
          <div className={cxDashboard("box__item")}>
            <div className={cxDashboard("box__icon")}>
              <FontAwesomeIcon
                className={cxDashboard("icon", "success")}
                icon={faCheck}
              />
            </div>
            <div className={cxDashboard("box__text")}>
              <Title className={cxDashboard("title")} text=" thành công" />
              <p className={cxDashboard("number")}>{dataOrderSuccessful}</p>
            </div>
          </div>
          <div className={cxDashboard("box__item")}>
            <div className={cxDashboard("box__icon")}>
              <FontAwesomeIcon
                className={cxDashboard("icon", "pending")}
                icon={faSpinner}
              />
            </div>
            <div className={cxDashboard("box__text")}>
              <Title className={cxDashboard("title")} text=" đang chờ" />
              <p className={cxDashboard("number")}>{dataOrderProcessing}</p>
            </div>
          </div>
          <div className={cxDashboard("box__item")}>
            <div className={cxDashboard("box__icon")}>
              <FontAwesomeIcon
                className={cxDashboard("icon", "failed")}
                icon={faXmark}
              />
            </div>
            <div className={cxDashboard("box__text")}>
              <Title className={cxDashboard("title")} text=" bị huỷ" />
              <p className={cxDashboard("number")}>{dataOrderFailed}</p>
            </div>
          </div>
        </div>
        <Filter
          titleLabel={"Lọc đơn hàng theo:"}
          categories={initialCategories}
          onFilterChange={handleFilterChange}
        />
        <div className={cx("box__table")}>
          {currentItems && currentItems.length > 0 ? (
            <table className={cx("table")}>
              <tbody>
                <tr className={cx("group__title")}>
                  <th className={cx("title__text")}>id</th>
                  <th className={cx("title__text")}>sản phẩm</th>
                  <th className={cx("title__text")}>Số tiền</th>
                  <th className={cx("title__text")}>thông tin người nhận</th>
                  <th className={cx("title__text")}>trạng thái</th>

                  <th className={cx("title__text")}>Ngày tạo</th>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr key={index} className={cx("group__row")}>
                      <td className={cx("item")}>{item.id}</td>
                      <td className={cx("item")}>
                        <div className={cx("image__name-product")}>
                          <div className={cx("box__infoProduct")}>
                            <div className={cx("box__detail")}>
                              <p className={cx("name__product")}>
                                {item.product_name}
                              </p>
                              <div className={cx("amount")}>
                                <p className={cx("quantity__product")}>
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className={cx("price__product")}>{item.price}</p>
                          </div>
                        </div>
                        {item.order_details.map((product, indexOrder) => {
                          return (
                            <div
                              key={indexOrder}
                              className={cx("image__name-product")}
                            >
                              <img
                                height={65}
                                className={cx("img_product")}
                                src={product.image_product}
                                alt=""
                              />
                              <div className={cx("box__infoProduct")}>
                                <div className={cx("box__detail")}>
                                  <p className={cx("name__product")}>
                                    {product.name_product}
                                  </p>
                                  <div className={cx("amount")}>
                                    <p className={cx("quantity__product")}>
                                      X {product.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p className={cx("price__product")}>
                                  {parseFloat(product.price).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td className={cx("item")}>
                        {parseFloat(item.total_payment).toLocaleString()}
                      </td>
                      <td className={cx("item")}>
                        <div className={cx("box__address")}>
                          <p>{item.full_name},</p>
                          <p>{item.phone_number},</p>
                          <p>{item.delivery_address}</p>
                        </div>
                      </td>
                      <td className={cx("item")}>
                        <Button
                          className={cx("btn", {
                            successful: item.order_status === "Successful",
                            failed: item.order_status === "Failed",
                            pending: item.order_status === "Processing",
                          })}
                          text={item.order_status}
                        />
                      </td>
                      <td className={cx("item")}>
                        {isValid(new Date(item.order_date))
                          ? format(
                              new Date(item.order_date),
                              "hh:mm, dd/MM/yyyy"
                            )
                          : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Title
              className={cx("title")}
              text="No users registered for an account..."
            />
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={dataOrder.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderStatistics;
