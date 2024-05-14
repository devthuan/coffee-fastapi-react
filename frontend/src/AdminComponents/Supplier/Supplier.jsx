import classNames from "classnames/bind";
import styles from "./Supplier.module.scss";
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
  GetAllSupplier,
  GetWarehousesAPI,
  SearchSupplierAPI,
  UpdateStatusAccount,
} from "../../services/UseServices";
import { intiSupplierData } from "../../redux/features/supplier/supplierSlice";
import ModalCreateSupplier from "../../components/Modal/ModalCreateSupplier";
import ModalUpdateSupplier from "../../components/Modal/UpdateSupplier";

const cx = classNames.bind(styles);

const Supplier = () => {
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.auth.role);

  const listSupplier = useSelector((state) => state.supplier.data);
  const memoizedWarehouseData = useMemo(() => listSupplier, [listSupplier]);
  const [dataSearch, setDataSearch] = useState([]);
  const [toggleModalImport, setToggleModalImport] = useState(false);
  const [toggleModalUpdate, setToggleModalUpdate] = useState(false);
  const [supplierEdit, setSupplierEdit] = useState("");

  const handleClickDelete = (id) => {
    // dispatch(removeUser(id));
  };

  const handleUpdateSupplier = (supplier) => {
    setToggleModalUpdate(!toggleModalUpdate);
    setSupplierEdit(supplier);
  };

  const handleSearchUser = async (event) => {
    let value = event.target.value;
    try {
      const res = await SearchSupplierAPI(value);
      if (res && res.status === 200) {
        setDataSearch(res.data.data);
      }
    } catch (error) {}
  };
  const handleCreateSupplier = () => {
    setToggleModalImport(!toggleModalImport);
  };
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetAllSupplier();

        if (res && res.status === 200) {
          const suppliersData = res.data.data;
          dispatch(intiSupplierData(suppliersData));
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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Quản lý nhà cung cấp" />
        <div className={cx("box_search")}>
          <Input
            className={cx("input")}
            type="text"
            onChange={(event) => handleSearchUser(event)}
            placeholder="Tìm kiếm theo tên nhà cung cấp"
          />
        </div>
        <Button
          onClick={(e) => handleCreateSupplier(e)}
          className={cx("btn", "create_btn")}
          text="Thêm nhà cung cấp"
        />
        <div className={cx("box__table")}>
          {listSupplier && listSupplier.length > 0 ? (
            <table className={cx("table")}>
              <tbody>
                <tr className={cx("group__title")}>
                  <th className={cx("title__text")}>ID</th>
                  <th className={cx("title__text")}>Tên nhà cung cấp</th>
                  <th className={cx("title__text")}>Địa chỉ</th>
                  <th className={cx("title__text")}>Số điện thoại</th>
                  <th className={cx("title__text")}>Email</th>
                  <th className={cx("title__text")}>Ngày tạo</th>
                  <th className={cx("title__text")}>Hành động</th>
                </tr>
                {dataSearch && dataSearch.length > 0
                  ? dataSearch.map((search, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{search.id}</td>
                          <td className={cx("item")}>{search.name_supplier}</td>
                          <td className={cx("item")}>{search.address}</td>
                          <td className={cx("item")}>{search.phone}</td>
                          <td className={cx("item")}>{search.email}</td>
                          <td className={cx("item")}>
                            {search.purchase_price}
                          </td>
                          <td className={cx("item")}>
                            {isValid(new Date(search.created_date))
                              ? format(
                                  new Date(search.created_date),
                                  "hh:mm, dd/MM/yyyy"
                                )
                              : ""}
                          </td>

                          <td className={cx("item")}>
                            <Button
                              className={cx("btn", "delete")}
                              onClick={() => handleUpdateSupplier(search)}
                              text="Sửa"
                            />
                            {permission && permission === "ADMIN" ? (
                              <Button
                                onClick={() => handleClickDelete(search.id)}
                                className={cx("btn", "delete")}
                                text="Xoá"
                              />
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : listSupplier.map((supplier, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{supplier.id}</td>
                          <td className={cx("item")}>
                            {supplier.name_supplier}
                          </td>
                          <td className={cx("item")}>{supplier.address}</td>

                          <td className={cx("item")}>{supplier.phone}</td>
                          <td className={cx("item")}>{supplier.email}</td>
                          <td className={cx("item")}>
                            {isValid(new Date(supplier.created_date))
                              ? format(
                                  new Date(supplier.created_date),
                                  "hh:mm, dd/MM/yyyy"
                                )
                              : ""}
                          </td>
                          <td className={cx("item")}>
                            <div className={cx("box_btn")}>
                              <Button
                                className={cx("btn", "delete")}
                                onClick={() => handleUpdateSupplier(supplier)}
                                text="Sửa"
                              />
                              {permission && permission === "ADMIN" ? (
                                <Button
                                  onClick={() => handleClickDelete(supplier.id)}
                                  className={cx("btn", "delete")}
                                  text="Xoá"
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
          ) : (
            <Title
              className={cx("title")}
              text="Không có nhà cung cấp nào..."
            />
          )}
        </div>
      </div>
      <ModalCreateSupplier toggleModal={toggleModalImport} />
      <ModalUpdateSupplier
        toggleModal={toggleModalUpdate}
        data={supplierEdit}
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

export default Supplier;
