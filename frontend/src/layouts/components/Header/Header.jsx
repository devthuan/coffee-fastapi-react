import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import ImageBackground from "../../../assets/images/coffee_image-1.png";

import Menu from "./Menu";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx("wrapper")}>
      <img
        width={1280}
        className="backgroundImage"
        src={ImageBackground}
        alt=""
      />

      <Menu />

      <div className={cx("banner")}>
        <p className={cx("hastag")}>#Welcome To</p>
        <h1 className={cx("title")}>THE LANGTHANG COFFEE HOUSE</h1>
        <p className={cx("description")}>
          không chỉ là coffee , chúng tôi bán cả sự trải nghiệm
        </p>
        <button className={cx("order-btn")}>
          <a href="#menu" className={cx("order-btn")}>
            Đặt Hàng
          </a>
        </button>
        <a className={cx("link")}>xem video giới thiệu</a>
      </div>
    </header>
  );
};

export default Header;
