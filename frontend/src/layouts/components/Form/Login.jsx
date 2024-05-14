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
import { addToken } from "../../../redux/features/login/tokenSlice";
import { login } from "../../../redux/features/user/authSlice";
import { useDispatch } from "react-redux";
import { LoginAPI } from "../../../services/UseServices";
import { decodeToken } from "../../../services/jwt";

const cx = classNames.bind(styles);

const Login = () => {
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
        const res = await LoginAPI(phone_number, password);
        if (res) {
          const token = res.data.data.access_token;
          const { email, role, list_permission } = decodeToken(token);
          setItemWithExpiration("token", [token, role, list_permission], 15);
          localStorage.setItem("email", JSON.stringify(inputValues[0]));
          dispatch(addToken(token));
          dispatch(
            login({
              isLoggedIn: true,
              list_permission: list_permission,
              role: role,
              token: token,
            })
          );
          setTimeout(() => {
            navigate("/");
          }, 800);
        }
      } else {
        toast.error("Vui lòng nhập đầy đủ thông tin đăng nhập!!!");
      }
    } catch (error) {
      if (error) {
        if (error.response.status === 401) {
          setError("Tên tài khoản hoặc mật khẩu không đúng.");
        } else if (error.response.status === 404) {
          setError("Tài khoản không tồn tại.");
        }
      } else {
        toast.error("Lỗi server!");
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
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
            {/* <p className={cx("forgot__password")}>Quên mật khẩu</p> */}
            <p className={cx("not__number")}>
              Bạn chưa có tài khoản ?
              <NavLink to="/register" className={cx("btn__register")}>
                Đăng Ký
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

export default Login;
