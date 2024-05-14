import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = (props) => {
  const checkLogin = useSelector((state) => state.auth.isLoggedIn);
  const permission = useSelector((state) => state.auth.role);
  if (!checkLogin) {
    alert("You need login !!!");
    return <Navigate to="/" />;
  }

  if (
    permission === "ADMIN" ||
    permission === "MANAGER" ||
    permission === "STAFF"
  ) {
    return <>{props.children}</>;
  } else if (permission === "CLIENT") {
    alert("Your account not admin.");
    return <Navigate to="/" />;
  } else {
    alert("Your account not admin.");
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
