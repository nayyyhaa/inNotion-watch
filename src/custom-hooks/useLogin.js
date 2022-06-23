import { useEffect } from "react";
import {
  getHistoryService,
  getLikesService,
  getPlaylistService,
  getWatchLaterService,
  loginService,
  signupService,
} from "services";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuth } from "redux/reducers/authSlice";
import { removeUser, setUser } from "redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { setWatchLater } from "redux/reducers/watchLaterSlice";
import { setLikes } from "redux/reducers/likesSlice";
import { setHistory } from "redux/reducers/historySlice";
import { setPlaylist } from "redux/reducers/playlistSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location?.state?.fromVal?.pathname || "/";

  const loginHandler = async (e, email, password) => {
    try {
      e.preventDefault();
      const [token, userData] = await loginService("/api/auth/login", email, password);
      dispatch(setUser(userData));
      localStorage.setItem("innotion-watch-token", token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setAuth({ token, isAuth: true }));
      const likesRes = await getLikesService(token);
      dispatch(setLikes(likesRes.likes));
      const watchlaterRes = await getWatchLaterService(token);
      dispatch(setWatchLater(watchlaterRes.watchlater));
      const historyRes = await getHistoryService(token);
      dispatch(setHistory(historyRes.history));
      const playlistRes = await getPlaylistService(token);
      dispatch(setPlaylist(playlistRes.playlists));
      toast.success(`Welcome ${userData.firstName}!`);
      navigate(from);
    } catch (err) {
      toast.error("User doesn't exists. Sign up now!");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("innotion-watch-token");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    dispatch(setLikes([]));
    dispatch(setWatchLater([]));
    dispatch(setHistory([]));
    dispatch(setPlaylist([]));
    dispatch(setAuth({ token: "", isAuth: false }));
    dispatch(removeUser());
    navigate("/login");
  };

  const signupHandler = async (e, email, password, firstName, lastName) => {
    try {
      e.preventDefault();
      const [token, userData] = await signupService("/api/auth/signup", email, password, firstName, lastName);
      dispatch(setUser(userData));
      localStorage.setItem("innotion-watch-token", token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setAuth({ token, isAuth: true }));
      toast.success(`Welcome ${userData.firstName}!`);
      navigate(from);
    } catch (err) {
      toast.error("User already exists! Try logging in.");
    }
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("innotion-watch-token");
      if (token) {
        const likesRes = await getLikesService(token);
        dispatch(setLikes(likesRes.likes));
        const watchlaterRes = await getWatchLaterService(token);
        dispatch(setWatchLater(watchlaterRes.watchlater));
        const historyRes = await getHistoryService(token);
        dispatch(setHistory(historyRes.history));
        const playlistRes = await getPlaylistService(token);
        dispatch(setPlaylist(playlistRes.playlists));
      }
    })();
  }, []);
  return { loginHandler, logoutHandler, signupHandler };
};
