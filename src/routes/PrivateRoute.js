import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRoute = () => {
  const { auth } = useSelector((store) => store.authReducer);

  useEffect(() => {
    if (!auth.isAuth) {
      toast.error("Log in/ Sign up to begin");
    }
  }, []);
  return auth.isAuth ? <Outlet /> : <Navigate to="/login" />;
};
