import classNames from "classnames/bind";
import styles from "./GetInfo.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Title from "../../../components/Title/Title";
const cx = classNames.bind(styles);

const GetInfo = () => {
  const GroupInput = [
    { type: "text", placeholder: "Họ và tên khách hàng" },
    { type: "text", placeholder: "Gmail khách hàng" },
    { type: "text", placeholder: "Lời nhắn của khách hàng" },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content__left")}>
          <h2 className={cx("content__left-title")}>
            ưu đãi Dành riêng <br /> Cho khách hàng qua website
          </h2>
          <p className={cx("content__left-description")}>
            Chúng tôi rất cảm kích sự quan tâm của bạn đến LangThang Coffee
            House và mong muốn có cơ hội chào đón bạn tới thưởng thức các loại
            nước uống và bánh ngọt tuyệt vời của chúng tôi. Hãy để lại thông tin
            của bạn để nhận ngay ưu đãi đặc biệt của chúng tôi - giảm ngay 30%
            trên tổng hóa đơn khi mua nước và bánh tại cửa hàng. Bằng cách đăng
            ký, bạn sẽ trở thành một phần của cộng đồng LangThang và được cập
            nhật về những sự kiện và ưu đãi đặc biệt sớm nhất. Chúng tôi cam kết
            bảo mật thông tin của bạn và chỉ sử dụng để gửi cho bạn các ưu đãi
            và tin tức mới nhất từ LangThang Coffee House. Một lần nữa, chúng
            tôi rất trân trọng sự quan tâm của bạn và hy vọng được đón tiếp bạn
            tại LangThang Coffee House sớm nhất!
          </p>
        </div>
        <div className={cx("content__right")}>
          {/* <h2 className={cx("content__right-title")}>Thông tin</h2> */}
          <Title className={cx("content__right-title")} text="Thông tin" />

          <div className={cx("group__input")}>
            {GroupInput.map((item, index) => {
              return (
                <Input
                  key={index}
                  className={cx("input")}
                  type={item.type}
                  placeholder={item.placeholder}
                />
              );
            })}
            <Button className={cx("btn")} text="Gửi" />
          </div>
        </div>
      </div>

      <div className="heello"></div>
    </div>
  );
};

export default GetInfo;
