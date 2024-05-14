import classNames from "classnames/bind";
import styles from "./Review.module.scss";
import Title from "../../../components/Title/Title";

import Button from "../../../components/Button/Button";
import AvatarClient from "../../../assets/images/avatar-client.png";
import IconLike from "../../../assets/images/icon-likr.png";

const cx = classNames.bind(styles);

const Review = () => {
  const ListComment = [
    {
      name: "Nguyễn Thuỳ Tiên",
      job: "Giảng viên",
      comment:
        "Tôi rất hài lòng về sản phẩm dịch vụ của bạn. Doanh số bán hàng của chúng tôi tăng lên đáng kể, khách hàng cũng phần nào phản hồi tích cực. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn.",
    },
    {
      name: "Vũ Thắng",
      job: "Doanh nhân",
      comment:
        "Tôi rất hài lòng về sản phẩm dịch vụ của bạn. Doanh số bán hàng của chúng tôi tăng lên đáng kể. Kiểu, khách hàng cũng phần nào phản hồi tích cực. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn.",
    },
    {
      name: "Dương Ngọc ",
      job: "Sinh viên  ",
      comment:
        "Tôi rất hài lòng về sản phẩm dịch vụ của bạn. Doanh số bán hàng của chúng tôi tăng lên đáng kể, khách hàng cũng phần nào phản hồi tích cực. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn.",
    },
    {
      name: "Nguyễn Minh Cường",
      job: "Người mẫu",
      comment:
        "Tôi rất hài lòng về sản phẩm dịch vụ của bạn. Doanh số bán hàng của chúng tôi tăng lên đáng kể, khách hàng cũng phần nào phản hồi tích cực. Hy vọng chúng ta có nhiều cơ hội làm việc với nhau hơn.",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Title className={cx("title")} text="Khách hàng nghĩ gì về chúng tôi" />
        <p className={cx("slogan")}>
          “Sự hài lòng của các bạn chính là sự thành công lớn nhất <br /> của
          chúng tôi”
        </p>
        <div className={cx("group__item")}>
          {ListComment.map((item, index) => {
            return (
              <div key={index} className={cx("item")}>
                <img
                  className={cx("img__avatar")}
                  width={115}
                  src={AvatarClient}
                  alt=""
                />
                <p className={cx("name")}>{item.name}</p>
                <p className={cx("job")}>{item.job}</p>
                <img
                  className={cx("img__icon")}
                  width={26}
                  src={IconLike}
                  alt=""
                />
                <p className={cx("description")}>{item.comment}</p>
              </div>
            );
          })}
        </div>
        <Button className={cx("btn")} text="Đóng góp ý kiến" />
      </div>
    </div>
  );
};

export default Review;
