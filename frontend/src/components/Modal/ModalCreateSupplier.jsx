// ModalComponent.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";

import { CreateSupplier } from "../../services/UseServices";

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
    width: "650px",
    height: "450px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
  },
};

const ModalCreateSupplier = ({ toggleModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [nameSupplier, setNameSupplier] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setNameSupplier("");
    setAddress("");
    setModalIsOpen(false);
  };

  const handleBtnCreateSupplier = async () => {
    console.log(nameSupplier, address, phone, email);
    try {
      let supplier = {
        name_supplier: nameSupplier,
        address: address,
        phone: phone,
        email: email,
      };
      const res = await CreateSupplier(supplier);
      if (res && res.status === 200) {
        toast.success("Tạo nhà cung cấp thành công.");
        setNameSupplier("");
        setAddress("");
        setPhone("");
        setEmail("");
        closeModal();
      } else {
        toast.error("Có lỗi xảy ra.");
      }
    } catch (error) {
      console.log(error);

      // if (error.response.data.detail.type === "missing") {
      //   toast.error("vui lòng nhập đầy đủ giá trị");
      // }
      toast.error("có lỗi xảy ra.");
    }
  };

  useEffect(() => {
    setModalIsOpen(toggleModal);
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
          <Title text="Thêm nhà cung cấp" />
          <div className={cx("inner")}>
            <div className={cx("")}>
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
                  SĐT :
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
                  email :
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
              onClick={(e) => handleBtnCreateSupplier()}
              className={cx("btn", "btn_update")}
              text="Tạo mới "
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

export default ModalCreateSupplier;
