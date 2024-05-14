import classNames from "classnames/bind";
import styles from "./CartLayout.module.scss";

import Menu from "../components/Header/Menu";
import Footer from "../components/Footer/Footer";
const cx = classNames.bind(styles);

const CartLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Menu />
      <div className={cx("container")}>
        <div className={cx("content")}> {children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default CartLayout;
