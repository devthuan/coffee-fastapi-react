import classNames from "classnames/bind";
import styles from "./Space.module.scss";

import Rectangle1 from "../../../assets/images/Rectangle-1.png";

const cx = classNames.bind(styles);

const Space = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("inner__left")}>
          <h1 className={cx("title")}>VỀ KHÔNG GIAN</h1>
          <p className={cx("description")}>
            Không gian của LANGTHANG COFFEE được thiết kế với tông màu vàng ấm
            áp và thoải mái. Đồ nội thất được bố trí thông minh và tinh tế để
            mang lại sự thoải mái cho khách hàng. Bức tranh nghệ thuật treo trên
            tường cùng với đèn lồng pha lê tạo ra một không gian sang trọng và
            quyến rũ. Bạn có thể ngồi ở các góc ngồi riêng tư hoặc các bàn đơn
            tùy theo sở thích của mình. LANGTHANG COFFEE sẽ là một nơi lý tưởng
            để bạn tìm kiếm sự yên bình và thư giãn.
          </p>
        </div>
        <div className={cx("inner__right")}>
          <img width={543} className={cx("img")} src={Rectangle1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Space;
