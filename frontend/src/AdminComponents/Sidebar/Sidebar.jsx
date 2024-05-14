import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faPeopleRoof,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

const Sidebar = () => {
  const navigate = useNavigate();
  const permissionAccount = useSelector((state) => state.auth.role);

  const location = useLocation();
  const listMenuManagement = [
    {
      route: "/dashboard",
      name: "Bảng điều kiển",
      icon: faGauge,
      permission: ["ADMIN", "MANAGER", "STAFF"],
    },
    {
      route: "/statistics-order",
      name: "Thống kê đơn hàng",
      icon: faCartShopping,
      permission: ["ADMIN", "MANAGER", "STAFF"],
    },
    {
      route: "/product",
      name: "Quản lý sản phẩm",
      icon: faCartShopping,
      permission: ["ADMIN", "MANAGER", "STAFF"],
    },
    {
      route: "/user-management",
      name: "Quản lý tài khoản",
      icon: faPeopleRoof,
      permission: ["ADMIN", "MANAGER"],
    },
    {
      route: "/warehouse",
      name: "Quản lý nguyên liệu",
      icon: faPeopleRoof,
      permission: ["ADMIN", "MANAGER", "STAFF"],
    },
    {
      route: "/supplier",
      name: "Quản lý nhà cung cấp",
      icon: faCartShopping,
      permission: ["ADMIN", "MANAGER"],
    },

    {
      route: "/management-order",
      name: "Quản lý giỏ hàng",
      icon: faCartShopping,
      permission: ["ADMIN", "MANAGER", "STAFF"],
    },
  ];

  const handleClickLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  console.log(
    listMenuManagement.map((item) => {
      console.log();
    })
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("content")}>
          <ul className={cx("list")}>
            {listMenuManagement &&
              listMenuManagement.map((item, index) => {
                let checkPermission =
                  item.permission.includes(permissionAccount);
                if (checkPermission) {
                  return (
                    <li
                      key={index}
                      className={cx(
                        "item",
                        item.route === location.pathname ? "active" : ""
                      )}
                    >
                      <NavLink to={item.route} className={cx("link")}>
                        <FontAwesomeIcon
                          className={cx("icon")}
                          icon={item.icon}
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  );
                } 
              })}

            <li onClick={() => handleClickLogout()} className={cx("item")}>
              <a className={cx("link", "logout")} href="/">
                <FontAwesomeIcon
                  className={cx("icon")}
                  icon={faRightFromBracket}
                />
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
