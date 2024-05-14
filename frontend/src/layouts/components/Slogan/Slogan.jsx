import classNames from "classnames/bind";
import styles from "./Slogan.module.scss";

import Logo from "../../../assets/images/logo2.svg";
import BackgroundImg from "../../../assets/images/Rectangle-151.png";
import Title from "../../../components/Title/Title";

const cx = classNames.bind(styles);

const Slogan = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img className={cx("background__img")} src={BackgroundImg} alt="" />
        <img width={126} className={cx("logo")} src={Logo} alt="" />
        <Title className={cx("slogan")} text="“Bởi vì chúng tôi có thể.”" />
      </div>
    </div>
  );
};

export default Slogan;
