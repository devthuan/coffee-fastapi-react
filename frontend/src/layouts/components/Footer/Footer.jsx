import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import Logo from "../../../assets/images/logo2.svg";
import IconMap from "../../../assets/images/map-pin.png";
import IconEmail from "../../../assets/images/icon-email.png";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Instagram from "../../../assets/images/instagram.png";
import Facebook from "../../../assets/images/icon-fb.png";
import Github from "../../../assets/images/icon-github.png";
import Rectangle132 from "../../../assets/images/Rectangle-132.png";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("group__logo")}>
          <img className={cx("logo")} src={Logo} alt="" />
          <p className={cx("text")}>
            Nơi đây là không gian, và cà phê là phương tiện để chúng ta sát lại
            gần nhau hơn
          </p>
        </div>
        <div className={cx("group__item")}>
          <table className={cx("table")}>
            <tbody>
              <tr className={cx("title")}>
                <th className={cx("title__text")}>Thông tin liên hệ</th>
                <th className={cx("title__text")}>Sản phẩm</th>
                <th className={cx("title__text")}>Giúp đỡ</th>
                <th className={cx("title__text")}>Khác</th>
              </tr>

              <tr className={cx("list")}>
                <td className={cx("item_contact")}>
                  <p className={cx("city")}>
                    <img
                      className={cx("icon-map")}
                      width={13}
                      src={IconMap}
                      alt=""
                    />
                    Hồ Chí Minh
                  </p>
                  <p className={cx("address")}>
                    391A Đ. Nam Kỳ Khởi Nghĩa, Phường 14, Quận 3
                  </p>
                  <p className={cx("city")}>
                    <img
                      className={cx("icon-map")}
                      width={13}
                      src={IconEmail}
                      alt=""
                    />
                    Gmail
                  </p>
                  <p className={cx("email")}>Thelangthang96@gmail.com</p>
                  <div className={cx("group__social")}>
                    <img
                      width={23}
                      className={cx("social__image")}
                      src={Instagram}
                      alt=""
                    />
                    <img
                      width={23}
                      className={cx("social__image")}
                      src={Facebook}
                      alt=""
                    />
                    <img
                      width={23}
                      className={cx("social__image")}
                      src={Github}
                      alt=""
                    />
                  </div>
                </td>
                <td className={cx("item__product")}>
                  <div className={cx("contact")}>
                    <p className={cx("product")}>Cà Phê</p>
                    <p className={cx("product")}>Sữa Tươi</p>
                    <p className={cx("product")}>Trà Sữa</p>
                    <p className={cx("product")}>Soda</p>
                    <p className={cx("product")}>Bánh Ngọt</p>
                  </div>
                </td>
                <td className={cx("item__product")}>
                  <p className={cx("product")}>Tìm Kiếm</p>
                  <p className={cx("product")}>Giới Thiệu</p>
                  <p className={cx("product")}>Tuyển Dụng</p>
                </td>
                <td className={cx("item__product")}>
                  <p className={cx("product")}>Đăng ký nhận khuyến mãi</p>
                  <Input
                    className={cx("input")}
                    type="text"
                    placeholder="nhập Email của bạn"
                  />
                  <Button className={cx("btn")} text="Gửi" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cx("copyright")}>
          <img
            className={cx("copyright__background")}
            src={Rectangle132}
            alt=""
          />
          <p className={cx("copyright__text")}>
            2023 Copyright © TheLangThang. All rights reserved. 28/08/2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
