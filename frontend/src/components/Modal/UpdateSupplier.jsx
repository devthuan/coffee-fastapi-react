// ModalUpdateUser.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";

import { UpdateSupplier } from "../../services/UseServices";

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

const ModalUpdateSupplier = ({ toggleModal, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [nameSupplier, setNameSupplier] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBtnUpdateSupplier = async () => {
    console.log(nameSupplier, address, phone, email);
    try {
      let supplier_update = {
        name_supplier: nameSupplier,
        address: address,
        phone: phone,
        email: email,
      };
      const res = await UpdateSupplier(data.id, supplier_update);
      if (res && res.status === 200) {
        toast.success("Đã cập nhật thành công");
        closeModal();
      } else {
        toast.error("Có lỗi xảy ra.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra.");

      console.log(error);
    }
  };

  useEffect(() => {
    setModalIsOpen(toggleModal);
    setNameSupplier(data.name_supplier);
    setAddress(data.address);
    setPhone(data.phone);
    setEmail(data.email);
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
                text="Chi tiết nhà cung cấp"
              />
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Tên NCC:
                </label>
                <Input
                  onChange={(e) => setNameSupplier(e.target.value)}
                  value={nameSupplier}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Địa chỉ:
                </label>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  SĐT:
                </label>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Email:
                </label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={cx("input")}
                  type="text"
                />
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
              onClick={(e) => handleBtnUpdateSupplier()}
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

export default ModalUpdateSupplier;
