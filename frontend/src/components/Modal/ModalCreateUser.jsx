// ModalComponent.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CreateUserAPI } from "../../services/UseServices";
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
    width: "650px",
    height: "450px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
  },
};

const ModalCreateUser = ({ toggleModal }) => {
  const permission = useSelector((state) => state.auth.role);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState(1);
  const [active, setActive] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEmail("");
    setPassword("");
    setModalIsOpen(false);
  };

  const handleBtnCreateUser = async () => {
    console.log(email, password, role);
    try {
      let user = {
        email: email,
        password: password,
        role_id: role,
      };
      const res = await CreateUserAPI(user);
      if (res && res.status === 200) {
        toast.success("Tạo tài khoản thành công.");
        setEmail("");
        setPassword("");
        setRole("");
        setActive("");
        closeModal();
      } else {
        toast.error("Có lỗi xảy ra.");
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.detail.type === "missing") {
        toast.error("vui lòng nhập đầy đủ giá trị");
      }
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
          <Title text="Tạo mới tài khoản" />
          <div className={cx("inner")}>
            <div className={cx("")}>
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
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Mật khẩu:
                </label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={cx("input")}
                  type="text"
                />
              </div>
              <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Quyền:
                </label>
                <select
                  defaultValue={1}
                  onChange={(e) => setRole(e.target.value)}
                  className={cx("input", "input_select")}
                >
                  {permission && permission === "ADMIN" && (
                    <>
                      <option >-- quyền tài khoản --</option>
                      <option value="1">Admin</option>
                      <option value="2">Manager</option>
                      <option value="3">Staff</option>
                      <option value="4">Client</option>
                    </>
                  )}

                  {permission && permission === "MANAGER" && (
                    <>
                      <option >-- quyền tài khoản --</option>
                      <option value="2">Manager</option>
                      <option value="3">Staff</option>
                      <option value="4">Client</option>
                    </>
                  )}
                </select>
              </div>
              {/* <div className={cx("box_input")}>
                <label className={cx("label__input")} htmlFor="">
                  Trạng thái:
                </label>
                <select
                  defaultValue={false}
                  onChange={(e) => setActive(e.target.value)}
                  className={cx("input", "input_select")}
                >
                  <option value="false">blocked</option>
                  <option value="true">active</option>
                </select>
              </div> */}
            </div>
          </div>
          <div className={cx("box__btn")}>
            <Button
              onClick={closeModal}
              className={cx("btn", "btn_close")}
              text="Đóng"
            />
            <Button
              onClick={(e) => handleBtnCreateUser()}
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

export default ModalCreateUser;
