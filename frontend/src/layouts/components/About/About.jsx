import classNames from "classnames/bind";
import styles from "./About.module.scss";
import BackgroundImage from "../../../assets/images/Rectangle-2.png";
import GlassImage from "../../../assets/images/image-2.png";
import Vector from "../../../assets/images/Vector.svg";


const cx = classNames.bind(styles);

const About = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img className={cx("background__image")} src={BackgroundImage} alt="" />
        <img
          height={363}
          className={cx("glass_image")}
          src={GlassImage}
          alt=""
        />
        <h1 className={cx("title")}>Best seller #1 <br/> Cà phê sữa</h1>
        <h1 className={cx("title__clone")}>Best seller #1 <br/> Cà phê sữa</h1>
        <button className={cx("button")} >Cùng tìm hiểu thêm
          <img className={cx("vector")} src={Vector} alt="" />
        </button>
      </div>
    </div>
  );
};

export default About;
