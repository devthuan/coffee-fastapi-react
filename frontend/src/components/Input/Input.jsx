import React from "react";
import styles from "./Input.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      className={cx("input", className)}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func, // Corrected spelling to onChange
  className: PropTypes.string,
};

export default Input;
