// ModalUpdateUser.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";

import { GetAllSupplier, UpdateInfoUser, UpdateWarehousesAPI } from "../../services/UseServices";

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
    width: "800px",
    height: "600px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
  },
};

const ModalUpdateWarehouses = ({ toggleModal, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [IngredientName, setIngredientName] = useState();
  const [quantityPerUnit, setQuantityPerUnit] = useState();
  const [purchasePrice, setPurchasePrice] = useState();
  const [supplierId, setSupplierId] = useState();
  const [listSupplier, setListSupplier] = useState();


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBtnUpdateWarehouses = async () => {
    console.log(IngredientName, quantityPerUnit, purchasePrice, supplierId);
    try {
      let warehouses_update = {
        ingredient_name: IngredientName,
        quantity_per_unit: quantityPerUnit,
        purchase_price: purchasePrice,
        supplier_id: supplierId,
      };
      const res = await UpdateWarehousesAPI(data.id, warehouses_update);
      if (res && res.status === 200) {
        toast.success("Đã cập nhật thành công");
        closeModal();
      } else {
        toast.error("Có lỗi xảy ra.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setModalIsOpen(toggleModal);
    setIngredientName(data.ingredient_name);
    setQuantityPerUnit(data.quantity_per_unit);
    setPurchasePrice(data.purchase_price);
    setSupplierId(data.supplier_id);
  }, [toggleModal]);
  useEffect(() => {
    setModalIsOpen(toggleModal);

    const fetchAPI = async () => {
      try {
        const res = await GetAllSupplier();
        setListSupplier(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPI();
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
          <Title text="Chỉnh sửa" />
          <div className={cx("inner")}>
            <div className={cx("")}>
              <Title
                className={cx("right__title")}
                text="Chi tiết nguyên liệu"
              />
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Nguyên liệu:
                </label>
                <Input
                  onChange={(e) => setIngredientName(e.target.value)}
                  value={IngredientName}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Số lượng:
                </label>
                <Input
                  onChange={(e) => setQuantityPerUnit(e.target.value)}
                  value={quantityPerUnit}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Giá mua:
                </label>
                <Input
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  value={purchasePrice}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Nhà cung cấp:
                </label>
                <select
                  onChange={(e) => setSupplierId(e.target.value)}
                  value={supplierId}
                  className={cx("input", "input_select")}
                >
                  {listSupplier &&
                    listSupplier.length > 0 &&
                    listSupplier.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name_supplier}
                      </option>
                    ))}
                </select>
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
              onClick={(e) => handleBtnUpdateWarehouses()}
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

export default ModalUpdateWarehouses;
