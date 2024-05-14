import classNames from "classnames/bind";
import styles from "./LoginLayout.module.scss";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);

const LoginLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("content")}> {children}</div>
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

export default LoginLayout;
