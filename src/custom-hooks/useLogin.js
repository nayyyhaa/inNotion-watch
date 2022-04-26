import {
  getHistoryService,
  getLikesService,
  getPlaylistService,
  getWatchLaterService,
  loginService,
  signupService,
} from "services";
import { useNavigate } from "react-router-dom";
import { useAuth, useHistory, useLikes, usePlaylist, useWatchLater } from "contexts";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth, setUser } = useAuth();
  const { dispatchLikes } = useLikes();
  const { dispatchWatchList } = useWatchLater();
  const { dispatchHistory } = useHistory();
  const { dispatchPlaylist } = usePlaylist();

  const loginHandler = async (e, email, password) => {
    try {
      e.preventDefault();
      const [token, userData] = await loginService("/api/auth/login", email, password);
      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuth({ token, isAuth: true });
      const likesRes = await getLikesService(token);
      dispatchLikes({ type: "SET_LIKES", payload: likesRes.likes });
      const watchlaterRes = await getWatchLaterService(token);
      dispatchWatchList({ type: "SET_WATCHLATER", payload: watchlaterRes.watchlater });
      const historyRes = await getHistoryService(token);
      dispatchHistory({ type: "SET_HISTORY", payload: historyRes.history });
      const playlistRes = await getPlaylistService(token);
      dispatchPlaylist({ type: "SET_PLAYLIST", payload: playlistRes.playlists });
      toast.success(`Welcome ${userData.firstName}!`);
      navigate("/");
    } catch (err) {
      toast.error("User doesn't exists. Sign up now!");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    dispatchLikes({ type: "SET_LIKES", payload: [] });
    dispatchWatchList({ type: "SET_WATCHLATER", payload: [] });
    setAuth({ token: "", isAuth: false });

    navigate("/login");
  };

  const signupHandler = async (e, email, password, firstName, lastName) => {
    try {
      e.preventDefault();
      const [token, userData] = await signupService("/api/auth/signup", email, password, firstName, lastName);
      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuth({ token, isAuth: true });
      toast.success(`Welcome ${userData.firstName}!`);
      navigate("/");
    } catch (err) {
      toast.error("User already exists! Try logging in.");
    }
  };
  return { loginHandler, logoutHandler, signupHandler };
};
