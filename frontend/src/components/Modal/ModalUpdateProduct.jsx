// ModalComponent.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";

import { UpdateProductAPI } from "../../services/UseServices";
import { isPast } from "date-fns";

const cx = classNames.bind(styles);

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay background color and opacity
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "850px",
    height: "700px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
  },
};

const ModalUpdateProduct = ({ toggleModal, product }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category_id, setCategory] = useState(1);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [img, setImg] = useState();
  const [ingredient, setIngredient] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBtnUpdateProduct = async () => {
    console.log(name, price, img, category_id, quantity);
    const productId = product.id;
    try {
      if (name && price && img && category_id && quantity) {
        let product = {
          name,
          price,
          file: img,
          category_id,
          quantity,
        };
        const res = await UpdateProductAPI(product, productId);
        if (res && res.status === 200) {
          toast.success("Cập nhật sản phẩm thành công.");
          closeModal();
        } else {
          toast.error("Có lỗi xảy ra.");
        }
      } else {
        toast.warning("vui lòng nhập đầy đủ giá trị.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra.");
    }
  };

  useEffect(() => {
    setModalIsOpen(toggleModal);
    setName(product.name_product);
    setPrice(product.price);
    setQuantity(product.quantity_available);
    setImg(product.image_product);
    setCategory(product.category_id);
  }, [toggleModal]);

  return (
    <div className={cx("container")}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className={cx("wrapper")}>
          <Title text="Chi tiết sản phẩm" />
          <div className={cx("inner")}>
            <div className={cx("")}>
              <Title className={cx("right__title")} text="Thông tin sản phẩm" />
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Tên sản phẩm:
                </label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Giá:
                </label>
                <Input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Số lượng:
                </label>
                <Input
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Loại:
                </label>
                <select
                  defaultValue={category_id}
                  onChange={(e) => setCategory(e.target.value)}
                  className={cx("input", "input_select")}
                >
                  <option value="1">Cà phê</option>
                  <option value="2">Trà sữa</option>
                  <option value="3">Soda</option>
                </select>
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Hình ảnh:
                </label>
                <div className={cx("box_file")}>
                  <Input
                    onChange={(e) => setImg(e.target.files[0])}
                    className={cx("input")}
                    type="file"
                  />
                  <img
                    height={80}
                    className={cx("img_product")}
                    src={product.image_product}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={cx("box__btn")}>
            <Button
              onClick={closeModal}
              className={cx("btn", "btn_close")}
              text="Đóng"
            />
            <Button
              onClick={(e) => handleBtnUpdateProduct(e)}
              className={cx("btn", "btn_update")}
              text="Cập nhật"
            />
          </div>
        </div>
      </Modal>

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
        theme="dark"
      />
    </div>
  );
};

export default ModalUpdateProduct;
