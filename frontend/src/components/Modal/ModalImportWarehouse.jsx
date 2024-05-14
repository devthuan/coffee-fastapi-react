// ModalComponent.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { ToastContainer, toast } from "react-toastify";

import { CreateWarehouses, GetAllSupplier } from "../../services/UseServices";
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

const ModalImportWarehouse = ({ toggleModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [category_id, setCategory] = useState(1);
  const [countInput, setCountInput] = useState(1);
  const [listSupplier, setListSupplier] = useState();
  const [supplier, setSupplier] = useState();
  const [inputValues, setInputValues] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRowInputChange = (index, values) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = { ...newInputValues[index], ...values };
    setInputValues(newInputValues);
  };

  const handleIncreaseBoxInput = () => {
    const inputs = [];
    for (let index = 0; index < countInput; index++) {
      inputs.push(
        <div className={cx("box_input", "box_input_warehouse")} key={index}>
          <Input
            name={`input1_${index}`}
            value={inputValues[index]?.input1}
            onChange={(e) =>
              handleRowInputChange(index, {
                ...inputValues[index],
                ingredient_name: e.target.value,
              })
            }
            className={cx("input")}
            type="text"
          />
          <Input
            name={`input2_${index}`}
            value={inputValues[index]?.input2}
            onChange={(e) =>
              handleRowInputChange(index, {
                ...inputValues[index],
                quantity_per_unit: e.target.value,
              })
            }
            className={cx("input")}
            type="text"
          />
          <Input
            name={`input3_${index}`}
            value={inputValues[index]?.input3}
            onChange={(e) =>
              handleRowInputChange(index, {
                ...inputValues[index],
                purchase_price: e.target.value,
              })
            }
            className={cx("input")}
            type="text"
          />
        </div>
      );
    }
    return inputs;
  };

  const handleCreateWarehouses = async () => {
    console.log(inputValues);
    console.log(supplier);
    // console.log(name, price, img, category_id, quantity);
    // const productId = product.id;
    try {
      if (inputValues && supplier) {
        let warehousesData = {
          detail_ingredient: inputValues,
          supplier_id: supplier,
        };
        const res = await CreateWarehouses(warehousesData);
        if (res && res.status === 200) {
          toast.success("Nhập kho thành công.");
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
          <Title text="Nhập nguyên liệu" />

          <div className={cx("")}>
            {/* <Title className={cx("right__title")} text="Thông tin sản phẩm" /> */}
            <div className={cx("box_input", "box_supplier")}>
              <label className={cx("label__input")} htmlFor="">
                Nhà cung cấp:
              </label>
              <select
                onChange={(e) => setSupplier(e.target.value)}
                className={cx("input", "input_select")}
              >
                <option value="">--Chọn nhà cung cấp--</option>
                {listSupplier &&
                  listSupplier.length > 0 &&
                  listSupplier.map((item, index) => (
                    <option
                      onChange={(e) => setSupplier(e.target.value)}
                      key={index}
                      value={item.id}
                    >
                      {item.name_supplier}
                    </option>
                  ))}
              </select>
            </div>
            <h1
              onClick={(e) => setCountInput(countInput + 1)}
              className={cx("icon_plus")}
            >
              +
            </h1>
            <h1
              onClick={(e) => setCountInput(countInput - 1)}
              className={cx("icon_minus")}
            >
              -
            </h1>
            <div className={cx("box_title")}>
              <label className={cx("title_warehouse")} htmlFor="">
                Tên nguyên liệu
              </label>
              <label className={cx("title_warehouse")} htmlFor="">
                Số lượng (gram)
              </label>
              <label className={cx("title_warehouse")} htmlFor="">
                Đơn giá (VNĐ)
              </label>
            </div>
            <div className={cx("box_ingredient")}>
              {handleIncreaseBoxInput()}
            </div>
          </div>
          <div className={cx("box__btn")}>
            <Button
              onClick={closeModal}
              className={cx("btn", "btn_close")}
              text="Đóng"
            />
            <Button
              onClick={(e) => handleCreateWarehouses(e)}
              className={cx("btn", "btn_update")}
              text="Nhập"
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

export default ModalImportWarehouse;
