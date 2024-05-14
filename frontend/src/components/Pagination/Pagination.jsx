import React from "react";
import styles from "./Pagination.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  // Tính toán số lượng trang
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Tạo mảng trang
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={cx("container")}>
      <ul className={cx("pagination")}>
        {pageNumbers.map((page) => (
          <li
            onClick={() => onPageChange(page)}
            key={page}
            className={cx(
              "pagination__item",
              page === currentPage ? "active" : ""
            )}
          >
            <p className={cx("pagination__number")}>{page}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Pagination;
