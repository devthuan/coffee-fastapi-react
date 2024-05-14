import classNames from "classnames/bind";
import styles from "./MenuCake.module.scss";
import { ToastContainer, toast } from "react-toastify";

import HearIcon from "../../../assets/images/icon-hear.svg";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/features/cart/cartSlice";
import { useEffect, useMemo } from "react";
import { addProduct } from "../../../redux/features/product/productSlice";
import { GetProductAPI, AddCartAPI } from "../../../services/UseServices";

const cx = classNames.bind(styles);

const MenuCake = () => {
  const dispatch = useDispatch();
  const dataProducts = useSelector((state) => state.product.data);
  const memoizedProductData = useMemo(() => dataProducts, [dataProducts]);
  let handleClickBtn = async (
    product_id,
    image_product,
    name_product,
    price
  ) => {
    try {
      let quantity = 1;
      const res = await AddCartAPI(product_id, quantity);

      if (res && res.status === 200) {
        const { id } = res.data.data;
        toast.success("Thêm sản phẩm thành công");
        dispatch(
          addItem({
            id,
            product_id,
            name_product,
            image_product,
            price,
            quantity,
          })
        );
      } else {
        toast.error("Có lỗi xảy ra!!!");
      }
    } catch (error) {
      toast.warning("Bạn cần đăng nhập trước khi đặt hàng");
      return;
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await GetProductAPI(1);

        if (res && res.status === 200 && res.data) {
          const data = res.data.data.data;
          data.forEach((item) =>
            dispatch(addProduct, {
              id: item.id,
              name_product: item.name_product,
              price: item.price,
              image_product: item.image_product,
              category: item.category,
              is_active: item.is_active,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    // check if data is available before calling api
    if (!memoizedProductData.length) {
      fetchAPI();
    }
  }, [dispatch, memoizedProductData]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h1 className={cx("title")}>
          bánh ngọt. <br /> Sao lại không?
        </h1>

        <div className={cx("group__card")}>
          {dataProducts &&
            dataProducts.map((item, index) => {
              if (item.category === "Cake") {
                return (
                  <div key={index} className={cx("item")}>
                    <div className={cx("background__image")}>
                      <img
                        width={189}
                        height={138}
                        className={cx("Item__image")}
                        src={item.image_product}
                        alt=""
                      />
                    </div>
                    <p className={cx("name")}>{item.name_product}</p>
                    <p className={cx("price")}>
                      {parseInt(item.price).toLocaleString()} VND
                    </p>
                    <img className={cx("item__icon")} src={HearIcon} alt="" />
                    <Button
                      onClick={() =>
                        handleClickBtn(
                          item.id,
                          item.image_product,
                          item.name_product,
                          item.price
                        )
                      }
                      className={cx("btn__add-cart")}
                      text="Thêm vào giỏ hàng"
                    />
                  </div>
                );
              }
              return null;
            })}
        </div>
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

export default MenuCake;
