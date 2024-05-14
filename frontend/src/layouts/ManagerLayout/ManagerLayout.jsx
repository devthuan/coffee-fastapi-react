import classNames from "classnames/bind";
import styles from "./ManagerLayout.module.scss";

import Sidebar from "../../AdminComponents/Sidebar/Sidebar";
const cx = classNames.bind(styles);

const ManagerLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("box__sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("content")}> {children}</div>
      </div>
    </div>
  );
};

export default ManagerLayout;
