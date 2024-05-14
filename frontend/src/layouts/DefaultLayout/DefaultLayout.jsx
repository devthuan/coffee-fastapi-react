import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

import Header from "../components/Header/Header";
import Space from "../components/Space/Space";
import About from "../components/About/About";
import MenuWater from "../components/MenuWater/MenuWater";
import Endow from "../components/Endow/Endow";
import MenuCake from "../components/MenuCake/MenuCake";
import Introduce from "../components/Introduce/Introduce";
import GetInfo from "../components/GetInfo/GetInfo";
import Team from "../components/Team/Team";
import Review from "../components/Review/Review";
import Slogan from "../components/Slogan/Slogan";
import Footer from "../components/Footer/Footer";



const cx = classNames.bind(styles);

const DefaultLayout = () => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <Space />
      <About />
      <MenuWater />
      <Endow />
      <MenuCake />
      <Introduce />
      <GetInfo />
      <Team />
      <Review />
      <Slogan />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
