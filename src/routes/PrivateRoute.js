import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { auth } = useSelector((store) => store.authReducer);
  return auth.isAuth ? <Outlet /> : <Navigate to="/login" />;
};
