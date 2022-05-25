import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "contexts/AuthContext";

export const PrivateRoute = () => {
  // const { auth } = useAuth();
  const { auth } = useSelector((store) => store.authReducer);
  return auth.isAuth ? <Outlet /> : <Navigate to="/login" />;
};
