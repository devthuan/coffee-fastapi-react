// ModalComponent.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";

import { CreateProductAPI } from "../../services/UseServices";
import { isPast } from "date-fns";

const cx = classNames.bind(styles);

Modal.setAppElement("#root");

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

const ModalComponent = ({ toggleModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState(1);
  const [image, setImage] = useState();
  const [numBoxInput, setNumBoxInput] = useState(1);
  const [inputValues, setInputValues] = useState(
    Array.from({ length: numBoxInput }, () => ({
      name_ingredient: "",
      quantity_required: "",
      unit: "",
    }))
  );

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBtnCreateProduct = async () => {
    console.log(name, price, category, image);
    try {
      let product = {
        name: name,
        price: price,
        file: image,
        category_id: category,
      };
      const res = await CreateProductAPI(product);
      if (res && res.status === 200) {
        toast.success("Tạo sản phẩm thành công.");
        setName("")
        setPrice("")
        setCategory("")
        setImage("")
        closeModal();
      } else {
        toast.error("Có lỗi xảy ra.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBtnPlus = (e) => {
    setNumBoxInput((prevNumBoxInput) => prevNumBoxInput + 1);
  };

  const handleInputChange = (index, fieldName, value) => {
    setInputValues((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = { ...newInputValues[index], [fieldName]: value };
      return newInputValues;
    });
    console.log(inputValues);
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
          <Title text="Tạo mới sản phẩm" />
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
                  Loại:
                </label>
                <select
                  defaultValue={1}
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
                    onChange={(e) => setImage(e.target.files[0])}
                    className={cx("input")}
                    type="file"
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
              onClick={(e) => handleBtnCreateProduct()}
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

export default ModalComponent;
