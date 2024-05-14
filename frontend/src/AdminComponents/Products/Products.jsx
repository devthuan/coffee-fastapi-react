import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { format, isValid } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ModalUpdateProduct from "../../components/Modal/ModalUpdateProduct";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../../components/Filter/Filter";
import { setStatusProduct } from "../../redux/features/product/productManagement";
import { initDataProduct } from "../../redux/features/product/productManagement";
import { useEffect, useMemo, useState } from "react";

import {
  GetProductAPI,
  SearchProduct,
  ProductChangeStatusAPI,
} from "../../services/UseServices";
import ModalComponent from "../../components/Modal/Modal";

const cx = classNames.bind(styles);

const Products = () => {
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.auth.role);
  const listProduct = useSelector((state) => state.productManager.data);
  const memoizedProductData = useMemo(() => listProduct, [listProduct]);
  const [dataSearch, setDataSearch] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalUpdate, setToggleModalUpdate] = useState(false);
  const [productUpdate, setProductUpdate] = useState("");

  const [filteredCategory, setFilteredCategory] = useState("");
  const initialCategories = ["Coffee", "Milk tea", "Soda", "Cake"];
  const filteredOrders = filteredCategory
    ? listProduct.filter((product) => product.category === filteredCategory)
    : listProduct;
  const handleFilterChange = (category) => {
    setFilteredCategory(category);
  };

  const handleClickUpdate = (product) => {
    setToggleModalUpdate(!toggleModalUpdate);
    setProductUpdate(product);
  };

  const handleBlockProduct = async (productId) => {
    try {
      let newStatus = false;
      const res = await ProductChangeStatusAPI(productId);
      if (res && res.status === 200) {
        dispatch(setStatusProduct({ productId, newStatus }));
        toast.success("Đã ngừng bán sản phẩm thành công.");
      }
    } catch (error) {}
  };
  const handleUnlockProduct = async (productId) => {
    try {
      let newStatus = true;
      const res = await ProductChangeStatusAPI(productId);
      if (res && res.status === 200) {
        dispatch(setStatusProduct({ productId, newStatus }));
        toast.success("Đã mở bán sản phẩm thành công.");
      }
    } catch (error) {}
  };

  const handleSearchUser = async (event) => {
    let value = event.target.value;
    try {
      const res = await SearchProduct(value);
      if (res && res.status === 200) {
        setDataSearch(res.data.data);
      }
    } catch (error) {}
  };

  const handleCreateProduct = (e) => {
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetProductAPI();
        if (res && res.status === 200) {
          const dataProduct = res.data.data;
          dispatch(
            initDataProduct({
              page: dataProduct.page,
              total_page: dataProduct.total_page,
              limit: dataProduct.limit,
              data: dataProduct.data,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!memoizedProductData.length) {
      fetchAPI();
    }
  }, [dispatch, memoizedProductData]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Quản sản phẩm" />
        <div className={cx("box_search")}>
          <Input
            className={cx("input")}
            type="text"
            onChange={(event) => handleSearchUser(event)}
            placeholder="Tìm kiếm theo số điện thoại hoặc họ và tên"
          />
        </div>
        <div className={cx("box__filter")}>
          <Filter
            titleLabel={"Lọc sản phẩm theo:"}
            categories={initialCategories}
            onFilterChange={handleFilterChange}
          />
          <Button
            onClick={(e) => handleCreateProduct(e)}
            className={cx("btn", "create_btn")}
            text="Tạo mới sản phẩm"
          />
        </div>
        <ModalComponent toggleModal={toggleModal}></ModalComponent>
        <div className={cx("box__table")}>
          {filteredOrders && filteredOrders.length >= 0 ? (
            <table className={cx("table")}>
              <tbody>
                <tr className={cx("group__title")}>
                  <th className={cx("title__text")}>STT</th>
                  <th className={cx("title__text")}>Tên sản phẩm</th>
                  <th className={cx("title__text")}>Hình ảnh</th>
                  <th className={cx("title__text")}>Giá</th>
                  <th className={cx("title__text")}>Loại</th>
                  <th className={cx("title__text")}>số lượng</th>

                  <th className={cx("title__text")}>Trạng thái</th>
                  <th className={cx("title__text")}>Ngày tạo</th>
                  {permission && permission === "ADMIN" ? (
                    <th className={cx("title__text")}>Thao tác</th>
                  ) : (
                    ""
                  )}
                </tr>
                {dataSearch && dataSearch.length > 0
                  ? dataSearch.map((search, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{search.id}</td>
                          <td className={cx("item")}>{search.name_product}</td>
                          <td className={cx("item")}>
                            <img
                              height={65}
                              className={cx("img_product")}
                              src={search.image_product}
                              alt=""
                            />
                          </td>
                          <td className={cx("item")}>{search.price}</td>
                          <td className={cx("item")}>{search.category}</td>
                          <td className={cx("item")}>
                            {search.quantity_available}
                          </td>
                          <td className={cx("item")}>
                            {search.is_active ? "đang bán" : "ngừng bán"}
                          </td>
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
                              <div className={cx("box_btn")}>
                                {search.is_active ? (
                                  <Button
                                    className={cx("btn", "delete")}
                                    onClick={() =>
                                      handleBlockProduct(search.id)
                                    }
                                    text="Ngừng bán"
                                  />
                                ) : (
                                  <Button
                                    className={cx("btn", "update")}
                                    onClick={() =>
                                      handleUnlockProduct(search.id)
                                    }
                                    text="Mở bán"
                                  />
                                )}
                                <Button
                                  onClick={() => handleClickUpdate(search)}
                                  className={cx("btn", "update")}
                                  text="Chỉnh sửa"
                                />
                              </div>
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      );
                    })
                  : filteredOrders.map((product, index) => {
                      return (
                        <tr key={index} className={cx("group__row")}>
                          <td className={cx("item")}>{product.id}</td>
                          <td className={cx("item")}>{product.name_product}</td>
                          <td className={cx("item")}>
                            <img
                              height={65}
                              className={cx("img_product")}
                              src={product.image_product}
                              alt=""
                            />
                          </td>
                          <td className={cx("item")}>{product.price}</td>
                          <td className={cx("item")}>{product.category}</td>
                          <td className={cx("item")}>
                            {product.quantity_available}
                          </td>
                          <td className={cx("item")}>
                            {product.is_active ? "đang bán" : "ngừng bán"}
                          </td>
                          <td className={cx("item")}>
                            {isValid(new Date(product.created_date))
                              ? format(
                                  new Date(product.created_date),
                                  "hh:mm, dd/MM/yyyy"
                                )
                              : ""}
                          </td>
                          {permission && permission === "ADMIN" ? (
                            <td className={cx("item")}>
                              <div className={cx("box_btn")}>
                                <>
                                  {product.is_active ? (
                                    <Button
                                      className={cx("btn", "delete")}
                                      onClick={() =>
                                        handleBlockProduct(product.id)
                                      }
                                      text="Ngừng bán"
                                    />
                                  ) : (
                                    <Button
                                      className={cx("btn", "update")}
                                      onClick={() =>
                                        handleUnlockProduct(product.id)
                                      }
                                      text="Mở bán"
                                    />
                                  )}

                                  <Button
                                    onClick={() => handleClickUpdate(product)}
                                    className={cx("btn", "update")}
                                    text="Chỉnh sửa"
                                  />
                                </>
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
      <ModalUpdateProduct
        toggleModal={toggleModalUpdate}
        product={productUpdate}
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

export default Products;
