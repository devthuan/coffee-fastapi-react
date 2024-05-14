import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Title from "../../../components/Title/Title";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { setItemWithExpiration } from "../../../services/LocalStorage";
import axios from "axios";
import { addToken } from "../../../redux/features/login/tokenSlice";
import { login } from "../../../redux/features/user/authSlice";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const ModelLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GroupInput = [
    {
      type: "text",
      label: "Tài khoản",
      placeholder: "Số điện thoại",
    },
    {
      type: "password",
      label: "Mật khẩu",
      placeholder: "Mật khẩu",
    },
  ];

  const [inputValues, setInputValues] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setInputValues((preValues) => ({
      ...preValues,
      [index]: value,
    }));
    setError(null);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleBtnLogin = async () => {
    try {
      const phone_number = inputValues[0];
      const password = inputValues[1];
      if (phone_number && password) {
        const res = await axios.post("http://localhost:5050/v1/login", {
          phone_number,
          password,
        });

        if (res && res.data && res.data.token) {
          const token = res.data.token.accessToken;
          const permission = res.data.permission;
          setItemWithExpiration("token", [token, permission], 1);
          localStorage.setItem("phone_number", JSON.stringify(inputValues[0]));
          dispatch(addToken(token));
          dispatch(login(permission));
          setTimeout(() => {
            navigate("/");
          }, 800);
        } else if (res && res.status === 401) {
          // Xử lý lỗi từ server
          setError("Tên tài khoản hoặc mật khẩu không đúng.");
        } else {
          // Xử lý các trường hợp lỗi khác
          setError("Có lỗi từ phía máy chủ.");
        }
      } else {
        toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập!!!");
      }
    } catch (error) {
      // Xử lý lỗi từ network hoặc lỗi khác
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className={cx("content__right")}>
      <Title className={cx("content__right-title")} text="Đăng Nhập" />

      <div className={cx("group__input")}>
        {GroupInput.map((item, index) => {
          return (
            <Fragment key={index}>
              <label htmlFor="" className={cx("title__input")}>
                {item.label}
              </label>
              <div className={cx("box__input")}>
                <Input
                  key={index}
                  className={cx("input")}
                  type={
                    item.type === "password" && showPassword
                      ? "text"
                      : item.type
                  }
                  placeholder={item.placeholder}
                  onChange={(e) => handleInputChange(e, index)}
                />
                {item.type === "password" ? (
                  <FontAwesomeIcon
                    onClick={handleTogglePassword}
                    className={cx("icon__eye")}
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                ) : (
                  ""
                )}
              </div>
            </Fragment>
          );
        })}
        {error && <p className={cx("error")}>{error}</p>}
        <Button
          onClick={() => handleBtnLogin()}
          className={cx("btn")}
          text="Đăng Nhập"
        />
      </div>

      <div className={cx("box__support")}>
        <p className={cx("forgot__password")}>Quên mật khẩu</p>
        <p className={cx("not__number")}>
          Bạn chưa có tài khoản ?
          <NavLink to="/register" className={cx("btn__register")}>
            Đăng Ký
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default ModelLogin;
