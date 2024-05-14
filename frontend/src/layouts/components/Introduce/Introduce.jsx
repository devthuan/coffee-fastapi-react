import classNames from "classnames/bind";
import styles from "./Introduce.module.scss";

import Rectangle148 from "../../../assets/images/Rectangle-148.png";
import Capuchino from "../../../assets/images/capuchino.jpg";
import EnvironmentImg from "../../../assets/images/Rectangle-166.png";
import ShipImg from "../../../assets/images/image-3.jpg";

const cx = classNames.bind(styles);

const Review = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img
          width={1280}
          height={2100}
          className={cx("img-background")}
          src={Rectangle148}
          alt=""
        />
        <h1 id="introduce" className={cx("title")}>
          Vì sao chúng tôi là nơi lí <br /> tưởng cho bạn
        </h1>
        <div className={cx("content")}>
          <div className={cx("content__img")}>
            <img
              width={462}
              className={cx("img-item")}
              src={Capuchino}
              alt=""
            />
          </div>
          <div className={cx("content__text")}>
            <h2 className={cx("content__title")}>Về cà phê</h2>
            <p className={cx("content__description")}>
              Cà phê tại quán của chúng tôi được pha chế từ những hạt cà phê
              chọn lọc kỹ càng và rang theo phương pháp truyền thống để đảm bảo
              hương vị đặc trưng và chất lượng tuyệt vời. Đến với quán cà phê
              của chúng tôi, bạn sẽ được thưởng thức một tách cà phê đậm đà và
              thơm ngon nhất.
            </p>
          </div>
        </div>

        <div className={cx("content")}>
          <div className={cx("content__text")}>
            <h2 className={cx("content__title")}>Về môi trường</h2>
            <p className={cx("content__description")}>
              Quán của chúng tôi có không gian ấm cúng và thiết kế sang trọng,
              tạo ra một môi trường thư giãn và đầy cảm hứng cho khách hàng. Bạn
              sẽ có cơ hội thưởng thức cà phê tuyệt vời trong một không gian
              thoải mái và đầy hứng khởi. Hãy ghé thăm quán của chúng tôi để tận
              hưởng không gian đẹp và thoải mái nhất.
            </p>
          </div>
          <div className={cx("content__img")}>
            <img
              width={571}
              className={cx("img-item")}
              src={EnvironmentImg}
              alt=""
            />
          </div>
        </div>

        <div className={cx("content")}>
          <div className={cx("content__img")}>
            <img width={442} className={cx("img-item")} src={ShipImg} alt="" />
          </div>
          <div className={cx("content__text")}>
            <h2 className={cx("content__title")}>về giao hàng</h2>
            <p className={cx("content__description")}>
              Quán của chúng tôi có không gian ấm cúng và thiết kế sang trọng,
              tạo ra một môi trường thư giãn và đầy cảm hứng cho khách hàng. Bạn
              sẽ có cơ hội thưởng thức cà phê tuyệt vời trong một không gian
              thoải mái và đầy hứng khởi. Hãy ghé thăm quán của chúng tôi để tận
              hưởng không gian đẹp và thoải mái nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
