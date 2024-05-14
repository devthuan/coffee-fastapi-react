import classNames from "classnames/bind";
import styles from "./Warehouse.module.scss";
import { format, isValid } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import ModalImportWarehouse from "../../components/Modal/ModalImportWarehouse";
import { removeUser, setStatusUser } from "../../redux/features/user/userSlice";
import { intiWarehousesData } from "../../redux/features/warehouses/warehousesSlice";
import { useEffect, useMemo, useState } from "react";
import {
  DeleteWarehouses,
  GetWarehousesAPI,
  StatisticalWarehousesAPI,
  SearchWarehousesAPI,
  UpdateStatusAccount,
} from "../../services/UseServices";
import ModelUpdateWarehouses from "../../components/Modal/UpdateWarehouses";
import ModalUpdateWarehouses from "../../components/Modal/UpdateWarehouses";
import BarChart from "../../components/Chart/BarChart";
import { initListIngredientAndQuantity } from "../../redux/features/warehouses/warehousesSlice";

const cx = classNames.bind(styles);

const Warehouse = () => {
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.auth.role);

  const listWarehouses = useSelector((state) => state.warehouse.data);
  const listIngredient = useSelector((state) => state.warehouse.listIngredient);
  console.log(listIngredient);
  const listQuantity = useSelector((state) => state.warehouse.listQuantity);
  const memoizedWarehouseData = useMemo(() => listWarehouses, [listWarehouses]);
  const [dataSearch, setDataSearch] = useState([]);
  const [toggleModalImport, setToggleModalImport] = useState(false);
  const [toggleModelUpdate, setToggleModelUpdate] = useState(false);
  const [updateWarehouses, setUpdateWarehouses] = useState("");
  const handleClickDelete = (id) => {
    dispatch(removeUser(id));
  };

  const handleEditIngredient = async (warehouse) => {
    setToggleModelUpdate(!toggleModelUpdate);
    setUpdateWarehouses(warehouse); // try {
    //   let newStatus = 1;
    //   const res = await UpdateStatusAccount(userId);
    //   if (res && res.status === 200) {
    //     dispatch(setStatusUser({ userId, newStatus }));
    //     toast.success("Đã mở khóa tài khoản thành công.");
    //   }
    // } catch (error) {}
  };

  const handleClickEdit = async (id, warehouses) => {
    try {
      const res = await DeleteWarehouses(id);
      if (res && res.status === 200) {
        toast.success("Xoá nguyên liệu trong kho thành công.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra.");
    }
  };

  const handleSearchUser = async (event) => {
    let value = event.target.value;
    try {
      const res = await SearchWarehousesAPI(value);
      if (res && res.status === 200) {
        setDataSearch(res.data.data);
      }
    } catch (error) {}
  };
  const handleImportWarehouse = () => {
    setToggleModalImport(!toggleModalImport);
  };
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetWarehousesAPI();

        if (res && res.status === 200) {
          const warehousesData = res.data.data;
          dispatch(intiWarehousesData(warehousesData));
        }
      } catch (error) {
        let status = error.response.status;
        let message = error.response.data.detail;
        if (status === 401 && message === "Not authenticated") {
          return <Navigate to="/login" />;
        }
      }
    };
    if (!memoizedWarehouseData.length) {
      fetchAPI();
    }
  }, [dispatch, memoizedWarehouseData]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await StatisticalWarehousesAPI();

        if (res && res.status === 200) {
          const warehousesData = res.data.data;
          let ingredient_names = [];
          let purchase_prices = [];
          let quantity_per_units = [];

          warehousesData.forEach((stat) => {
            ingredient_names.push(stat["ingredient_name"]);
            purchase_prices.push(stat["purchase_price"]);
            quantity_per_units.push(stat["quantity_per_unit"]);
          });
          dispatch(
            initListIngredientAndQuantity({
              ingredient_names,
              quantity_per_units,
            })
          );
        }
      } catch (error) {
        let status = error.response.status;
        let message = error.response.data.detail;
        if (status === 401 && message === "Not authenticated") {
          return <Navigate to="/login" />;
        }
      }
    };
    fetchAPI();
  }, [dispatch]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Quản lý kho" />
        <div className={cx("box_search")}>
          <Input
            className={cx("input")}
            type="text"
            onChange={(event) => handleSearchUser(event)}
            placeholder="Tìm kiếm theo số điện thoại hoặc họ và tên"
          />
        </div>
        <div className="box__chart">
          {listIngredient &&
            listQuantity &&
            listIngredient.length > 0 &&
            listQuantity.length > 0 && (
              <BarChart
                title="Tổng số lượng theo nguyên liệu"
                labels={listIngredient}
                data={listQuantity}
              />
            )}
        </div>

        <Button
          onClick={(e) => handleImportWarehouse(e)}
          className={cx("btn", "create_btn")}
          text="Nhập nguyên liệu"
        />
        <div className={cx("box__table")}>
          {listWarehouses && listWarehouses.length > 0 ? (
            <table className={cx("table")}>
              <tbody>
                <tr className={cx("group__title")}>
                  <th className={cx("title__text")}>ID</th>
                  <th className={cx("title__text")}>Tên nguyên liệu</th>
                  <th className={cx("title__text")}>Số lượng</th>
                  <th className={cx("title__text")}>Đơn vị</th>
                  <th className={cx("title__text")}>Giá mua</th>
                  <th className={cx("title__text")}>nhà cung cấp</th>
                  <th className={cx("title__text")}>Ngày mua</th>
                  {permission && permission === "ADMIN" ? (
                    <th className={cx("title__text")}>Hành động</th>
                  ) : (
                    ""
                  )}
                </tr>
                {dataSearch && dataSearch.length > 0
                  ? dataSearch.map((search, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{search.id}</td>
                          <td className={cx("item")}>
                            {search.ingredient_name}
                          </td>
                          <td className={cx("item")}>
                            {search.quantity_per_unit}
                          </td>
                          <td className={cx("item")}>
                            {search.unit_of_measure}
                          </td>
                          <td className={cx("item")}>
                            {search.purchase_price}
                          </td>
                          <td className={cx("item")}>{search.supplier_name}</td>

                          <td className={cx("item")}>
                            {isValid(new Date(search.created_date))
                              ? format(
                                  new Date(search.created_date),
                                  "hh:mm, dd/MM/yyyy"
                                )
                              : ""}
                          </td>
                          {permission && permission === "ADMIN" ? (
                            <td className={cx("item")}>
                              <Button
                                className={cx("btn", "update")}
                                onClick={() => handleEditIngredient(search)}
                                text="Sửa"
                              />
                              <Button
                                onClick={() => handleClickDelete(search.id)}
                                className={cx("btn", "delete")}
                                text="xoá"
                              />
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      );
                    })
                  : listWarehouses.map((warehouse, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{warehouse.id}</td>
                          <td className={cx("item")}>
                            {warehouse.ingredient_name}
                          </td>

                          <td className={cx("item")}>
                            {warehouse.quantity_per_unit}
                          </td>
                          <td className={cx("item")}>
                            {warehouse.unit_of_measure}
                          </td>
                          <td className={cx("item")}>
                            {warehouse.purchase_price}
                          </td>
                          <td className={cx("item")}>
                            {warehouse.supplier_name}
                          </td>
                          <td className={cx("item")}>
                            {isValid(new Date(warehouse.created_date))
                              ? format(
                                  new Date(warehouse.created_date),
                                  "hh:mm, dd/MM/yyyy"
                                )
                              : ""}
                          </td>
                          {permission && permission === "ADMIN" ? (
                            <td className={cx("item")}>
                              <div className={cx("box_btn")}>
                                <Button
                                  className={cx("btn", "update")}
                                  onClick={() =>
                                    handleEditIngredient(warehouse)
                                  }
                                  text="Sửa"
                                />
                                <Button
                                  onClick={() =>
                                    handleClickEdit(warehouse.id, warehouse)
                                  }
                                  className={cx("btn", "delete")}
                                  text="Xoá"
                                />
                              </div>
                            </td>
                          ) : (
                            ""
                          )}
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
      </div>
      <ModalImportWarehouse toggleModal={toggleModalImport} />
      <ModalUpdateWarehouses
        toggleModal={toggleModelUpdate}
        data={updateWarehouses}
      />
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

export default Warehouse;
