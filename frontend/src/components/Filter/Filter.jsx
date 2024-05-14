import React from "react";
import styles from "./filter.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Filter = ({ titleLabel, categories, onFilterChange }) => {
  return (
    <div className={cx("container")}>
      <div>
        <label className={cx("title_label")} htmlFor="category">
          {titleLabel}
        </label>
        <select
          className={cx("input_select")}
          id="category"
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Filter;
