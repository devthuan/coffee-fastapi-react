import React from "react";
import styles from "./Title.module.scss"; // Import the SCSS module
import classNames from "classnames/bind";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Title = ({ text, className }) => {
  return <h1 className={cx("title", className)}>{text}</h1>;
};

Title.propTypes = {
  // Corrected propTypes spelling
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Title;
