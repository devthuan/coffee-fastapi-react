import classNames from "classnames/bind";
import styles from "./Team.module.scss";

import Avatar from "../../../assets/images/avatar-crycle.jpg";
import Founder from "../../../assets/images/founder.jpg";
import CoFounder from "../../../assets/images/co-founder.jpg";
import Instagram from "../../../assets/images/instagram.png";
import Facebook from "../../../assets/images/icon-fb.png";
import Github from "../../../assets/images/icon-github.png";
import Rectangle1 from "../../../assets/images/Rectangle149.png";

const cx = classNames.bind(styles);

const Team = () => {
  const ListTeam = [
    {
      name: "Nguyễn Minh Trí",
      avatar: Avatar,
      level: "Manager",
      instagram: Instagram,
      facebook: Facebook,
      github: Github,
    },
    {
      name: "Hồ Thị Tố Quyên",
      avatar: Founder,
      level: "Founder",
      instagram: Instagram,
      facebook: Facebook,
      github: Github,
    },
    {
      name: "Cao Đức Long",
      avatar: CoFounder,
      level: "Co-founder",
      instagram: Instagram,
      facebook: Facebook,
      github: Github,
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img
          width={1280}
          className={cx("image__background")}
          src={Rectangle1}
          alt=""
        />
        <h1 id="team" className={cx("title")}>và chúng tôi</h1>
        <div className={cx("group__item")}>
          {ListTeam.map((item, index) => {
            return (
              <div key={index} className={cx("item")}>
                <img
                  width={146}
                  className={cx("avatar__image")}
                  src={item.avatar}
                  alt=""
                />
                <p className={cx("name")}>{item.name}</p>
                <p className={cx("level")}>{item.level}</p>
                <div className={cx("group__social")}>
                  <img
                    width={35}
                    className={cx("social__image")}
                    src={item.instagram}
                    alt=""
                  />
                  <img
                    width={35}
                    className={cx("social__image")}
                    src={item.facebook}
                    alt=""
                  />
                  <img
                    width={35}
                    className={cx("social__image")}
                    src={item.github}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;
