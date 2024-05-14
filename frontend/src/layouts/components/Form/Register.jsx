import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Title from "../../../components/Title/Title";
import { NavLink, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RegisterAPI } from "../../../services/UseServices";
import { validateRegisterData } from "../../../validations/validations";
import { addInfoRegister } from "../../../redux/features/user/registerSlice";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GroupInput = [
    { type: "text", label: "Email", placeholder: "Email" },
    { type: "text", label: "Số Điện thoại", placeholder: "Số điện thoại" },
    { type: "password", label: "Mật khẩu", placeholder: "Mật khẩu" },
  ];

  const [inputValues, setInputValues] = useState({});

  const handleInputValues = (e, index) => {
    const { value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const email = inputValues[0];
      const phone_number = inputValues[1];
      const password = inputValues[2];
      if (email && phone_number && password) {
        let validationErrors = validateRegisterData(password, phone_number);
        if (validationErrors) {
          validationErrors.forEach((item) => {
            toast.error(item);
          });
          return;
        }

        const res = await RegisterAPI(email, password);
        if (res && res.status === 400 && res.data) {
          toast.error(res.data.error);
        }

        if (res && res.status === 200 && res.data) {
          localStorage.setItem("email", JSON.stringify(email));
          dispatch(
            addInfoRegister({
              email,
              phone_number,
            })
          );
          toast.success("đăng ký tài khoản thành công.");

          navigate("/login");
        }
      } else {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!!");
        return;
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Tên tài khoản đã tồn tại.");
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content__right")}>
          <Title className={cx("content__right-title")} text="Đăng ký" />

          <div className={cx("group__input")}>
            {GroupInput.map((item, index) => {
              return (
                <Fragment key={index}>
                  <label htmlFor="" className={cx("title__input")}>
                    {item.label}
                  </label>
                  <Input
                    value={inputValues[item]}
                    key={index}
                    className={cx("input")}
                    type={item.type}
                    placeholder={item.placeholder}
                    onChange={(e) => handleInputValues(e, index)}
                  />
                </Fragment>
              );
            })}
            <Button
              onClick={() => handleRegister()}
              className={cx("btn")}
              text="Đăng Ký"
            />
          </div>
          <div className={cx("box__support")}>
            <p className={cx("not__number")}>
              Bạn đã có tài khoản ?
              <NavLink to="/login" className={cx("btn__register")}>
                {" "}
                Đăng Nhập
              </NavLink>
            </p>
          </div>
        </div>
      </div>
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

export default Register;
