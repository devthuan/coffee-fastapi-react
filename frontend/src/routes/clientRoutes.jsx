import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ClientRoutes = (props) => {
  const checkLogin = useSelector((state) => state.auth.isLoggedIn);

  if (!checkLogin) {
    alert("You need Login !");
    return <Navigate to="/" />;
  } else {
    return <>{props.children}</>;
  }
};

export default ClientRoutes;
