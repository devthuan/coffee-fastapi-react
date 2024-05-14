import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Title from "../../../components/Title/Title";
import { NavLink, useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  ActivatingAccountAPI,
  ResendOTPAPI,
} from "../../../services/UseServices";
const cx = classNames.bind(styles);

const Otp = () => {
  const dataRegister = useSelector((data) => data.register.data);
  const emailInLocal = JSON.parse(localStorage.getItem("email"));
  const email = dataRegister[0] ? dataRegister[0]?.email : emailInLocal;
  console.log(email);

  const navigate = useNavigate();
  const GroupInput = [
    { type: "text", label: "Mã OTP", placeholder: "Nhập mã OTP" },
  ];

  const [inputValues, setInputValues] = useState("");

  const handleInputValues = (e, index) => {
    const { value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const handleConfirm = async () => {
    try {
      const otp = inputValues[0];

      if (otp && otp.length === 6) {
        const res = await ActivatingAccountAPI(otp, email);
        if (res && res.status === 400 && res.data) {
          toast.error(res.data.error);
        }
        if (res && res.status === 200 && res.data) {
          toast.success(res.data.message);
          localStorage.removeItem("email");
          navigate("/login");
        }
      } else {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!!");
      }
    } catch (error) {
      console.log("check error: ", error);
      toast.error(error.response.data.error);
    }
  };

  const handleResendOTP = async () => {
    const res = await ResendOTPAPI(email);
    setTimeLeft(60);
  };

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdownInterval);
  });

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content__right")}>
          <Title
            className={cx("content__right-title")}
            text="Xác thực tài khoản"
          />

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
            <p className={cx("not__number", "resend_otp")}>
              Bạn đã chưa nhập được mã OTP?
              {timeLeft > 0 ? (
                ` ${timeLeft % 60} seconds`
              ) : (
                <NavLink
                  onClick={() => handleResendOTP()}
                  className={cx("btn__register")}
                >
                  Gửi lại
                </NavLink>
              )}
            </p>
            <Button
              onClick={() => handleConfirm()}
              className={cx("btn")}
              text="Xác Nhận"
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
    </div>
  );
};

export default Otp;
