import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "redux/reducers/userSlice";

export const useValueChange = ({ name, value }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userReducer);
  const { auth } = useSelector((store) => store.authReducer);
  useEffect(() => {
    const newUserData = { ...user, [name]: value };
    dispatch(setUser(newUserData));
    if (auth.isAuth) localStorage.setItem("user", JSON.stringify(newUserData));
    else dispatch(removeUser());
  }, [value]);
};
