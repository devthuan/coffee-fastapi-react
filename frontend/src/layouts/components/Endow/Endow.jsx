import classNames from "classnames/bind";
import styles from "./Endow.module.scss";

import ImageLeft from "../../../assets/images/Rectangle-132.jpg";
import ImageRight from "../../../assets/images/Rectangle 134.jpg";
import BackgroundEndow from "../../../assets/images/background-endow-1.png";
import Title from "../../../components/Title/Title";
const cx = classNames.bind(styles);

const Space = () => {
  return (
    <div className={cx("wrapper")}>
      <div id="endow" className={cx("inner")}>
        <Title className={cx("title")} text="cùng với những ưu đãi" />
        <div className={cx("content")}>
          <img width={400} className={cx("img")} src={ImageLeft} alt="" />
          <div className={cx("text-1")}>
            <img className={cx("text-1__img")} src={BackgroundEndow} alt="" />
            <h2 className={cx("text-1__title")}>ƯU ĐÃI #1</h2>

            <p className={cx("text-1__description")}>
              Sự kết hợp giữa Cappuccino và bánh bông lan nhân khô nho là một
              cách tuyệt vời để kết hợp hương vị ngọt ngào và tươi mát.
              Cappucino thơm ngon và mát lạnh sẽ làm dịu cơn khát vào những ngày
              nóng bức. Bánh bông lan nhân khô nho sẽ tạo ra một vị ngọt dịu,
              cùng với vị giòn của bánh, mang lại trải nghiệm thưởng thức đầy
              tuyệt vời. Hãy đến LangThang Coffee của chúng tôi để thưởng thức
              Ưu Đãi này ngay hôm nay!
            </p>
          </div>
        </div>
        <div className={cx("content-2")}>
          <div className={cx("text-2")}>
            <img
              width={658}
              height={296}
              className={cx("text-2__img")}
              src={BackgroundEndow}
              alt=""
            />
            <h2 className={cx("text-2__title")}>ƯU ĐÃI #2</h2>
            <p className={cx("text-2__description")}>
              Cappuccino kết hợp với bánh sừng bò mặn tạo ra sự kết hợp ngon
              miệng giữa hương vị ngọt và mặn. Bạn có thể thưởng thức miếng bánh
              sừng bò mặn giòn tan kèm với một cốc Cappuccino thơm ngon và mát
              lạnh để tạo ra một trải nghiệm thưởng thức thực phẩm hoàn hảo.
            </p>
          </div>
          <img width={427} className={cx("img-2")} src={ImageRight} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Space;
