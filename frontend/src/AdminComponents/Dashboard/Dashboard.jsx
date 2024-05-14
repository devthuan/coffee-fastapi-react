import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import Title from "../../components/Title/Title";
import PieChart from "../../components/Chart/PieChart";
import LineChart from "../../components/Chart/LineChart";
import BarChart from "../../components/Chart/BarChart";
import { useEffect, useMemo, useState } from "react";
import {
  GetUser,
  StatisticalRevenueAPI,
  StatisticalOrderAPI,
} from "../../services/UseServices";
import { useSelector, useDispatch } from "react-redux";
import { addTotalData } from "../../redux/features/user/userSlice";
import { GetOrdersAPI } from "../../services/UseServices";
import { addOrderStatistic } from "../../redux/features/order/orderStatisticSlice";
import {
  intiStatisticalData,
  intiStatisticalOrder,
} from "../../redux/features/statistical/statisticalSlice";
const cx = classNames.bind(styles);

const Dashboard = () => {
  const dispatch = useDispatch();
  const totalUser = useSelector((state) => state.user.totalData);
  const totalOrder = useSelector((state) => state.orderStatistic.totalData);
  const success_order = useSelector((state) => state.orderStatistic.success);
  const failed_order = useSelector((state) => state.orderStatistic.failed);

  const dataStatisticalRevenue = useSelector((state) => state.statistical.data);
  const labelsRevenue = dataStatisticalRevenue.map((item) => item.date_revenue);
  const dataRevenue = dataStatisticalRevenue.map((item) => item.total_revenue);

  const dataStatisticalOrder = useSelector(
    (state) => state.statistical.data_order
  );
  const labelsOrder = dataStatisticalOrder.map((item) => item.date_of_week);
  const dataOrder = dataStatisticalOrder.map((item) => item.total_order);

  const processing_order = useSelector(
    (state) => state.orderStatistic.processing
  );
  const totalSales = useSelector((state) => state.orderStatistic.totalSales);

  const memoizedUserDataUser = useMemo(() => totalUser, [totalUser]);
  const memoizedUserDataOrder = useMemo(() => totalOrder, [totalOrder]);

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
    if (memoizedUserDataOrder === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserDataOrder]);

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
    if (memoizedUserDataOrder === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserDataOrder]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const users = await GetUser();
        if (users && users.status === 200) {
          const data = users.data.data.data.total_items;
          dispatch(addTotalData(data));
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    if (memoizedUserDataUser === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserDataUser]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await StatisticalRevenueAPI();
        if (res && res.status === 200) {
          const data = res.data.data;
          dispatch(intiStatisticalData(data));
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    if (memoizedUserDataUser === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserDataUser]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await StatisticalOrderAPI();
        if (res && res.status === 200) {
          const data = res.data.data;
          dispatch(intiStatisticalOrder(data));
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    if (memoizedUserDataUser === 0) {
      fetchAPI();
    }
  }, [dispatch, memoizedUserDataUser]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("box__statistical")}>
          <div className={cx("box__item")}>
            <div className={cx("box__icon")}>
              <FontAwesomeIcon className={cx("icon")} icon={faMoneyBill} />
            </div>
            <div className={cx("box__text")}>
              <Title className={cx("title")} text="Tổng doanh thu" />
              <p className={cx("number")}>{totalSales.toLocaleString()} VNĐ</p>
            </div>
          </div>
          <div className={cx("box__item")}>
            <div className={cx("box__icon")}>
              <FontAwesomeIcon className={cx("icon")} icon={faUser} />
            </div>
            <div className={cx("box__text")}>
              <Title className={cx("title")} text="Tổng thành viên" />
              <p className={cx("number")}>{totalUser}</p>
            </div>
          </div>
          <div className={cx("box__item")}>
            <div className={cx("box__icon")}>
              <FontAwesomeIcon className={cx("icon")} icon={faCartShopping} />
            </div>
            <div className={cx("box__text")}>
              <Title className={cx("title")} text="tổng đơn hàng" />
              <p className={cx("number")}>{totalOrder}</p>
            </div>
          </div>
        </div>
        <div className={cx("box__barChart")}>
          {labelsRevenue &&
            dataRevenue &&
            labelsRevenue.length > 0 &&
            dataRevenue.length > 0 && (
              <BarChart
                title="Thống kê doanh thu theo 30 ngày gần nhất"
                labels={labelsRevenue}
                data={dataRevenue}
              />
            )}
        </div>
        <div className={cx("box__lineChart")}>
          {labelsOrder &&
            dataOrder &&
            labelsOrder.length > 0 &&
            dataOrder.length > 0 && (
              <LineChart
                title="Tổng đơn hàng các ngày trong tuần"
                labels={labelsOrder}
                data={dataOrder}
              />
            )}
        </div>
        <div className={cx("box__chart")}>
          <div className={cx("chart__item")}>
            {success_order && failed_order && (
              <PieChart
                success={success_order}
                failed={failed_order}
                processing={processing_order}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
