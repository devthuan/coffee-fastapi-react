// ModalUpdateUser.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";

import { UpdateInfoUser } from "../../services/UseServices";

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

const ModalUpdateUser = ({ toggleModal, user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [role, setRole] = useState();
  const [active, setActive] = useState();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBtnUpdateUser = async () => {
    console.log(email, phone, address, role, active);
    try {
      let update_user = {
        email: email,
        phone: phone,
        address: address,
        role_id: role,
        is_active: active,
      };
      const res = await UpdateInfoUser(update_user, user.id);
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
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setRole(user.role_id);
    setActive(user.is_active);
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
          <Title text="Chỉnh sửa tài khoản" />
          <div className={cx("inner")}>
            <div className={cx("")}>
              <Title className={cx("right__title")} text="Thông tin sản phẩm" />
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  email:
                </label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  địa chỉ:
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
                  quyền:
                </label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  className={cx("input", "input_select")}
                >
                  <option value="1">Admin</option>
                  <option value="2">Manager</option>
                  <option value="3">Staff</option>
                  <option value="4">Client</option>
                </select>
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Trạng thái:
                </label>
                <select
                  onChange={(e) => setActive(e.target.value)}
                  value={active}
                  className={cx("input", "input_select")}
                >
                  <option value="false">blocked</option>
                  <option value="true">active</option>
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
              onClick={(e) => handleBtnUpdateUser()}
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

export default ModalUpdateUser;
