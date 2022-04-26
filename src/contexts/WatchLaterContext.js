import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { watchLaterReducer } from "reducers/watchLaterReducer";
import { createWatchLaterService, deleteWatchLaterService, getWatchLaterService } from "services";
import { useAuth } from "./AuthContext";

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const [watchList, dispatchWatchList] = useReducer(watchLaterReducer, []);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getWatchLater = async () => {
    try {
      if (auth.isAuth) {
        const res = await getWatchLaterService(auth.token);
        dispatchWatchList({ type: "SET_WATCHLATER", payload: res.watchlater });
      } else navigate("/login");
    } catch (err) {
      toast.error("Error in getting watch later");
    }
  };

  const createWatchLater = async (video) => {
    try {
      if (auth.isAuth) {
        const res = await createWatchLaterService(auth.token, video);
        dispatchWatchList({ type: "SET_WATCHLATER", payload: res.watchlater });
        toast.success("Added to watch later!");
      } else navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Error in adding to watch later");
    }
  };

  const deleteWatchLater = async (id) => {
    try {
      if (auth.isAuth) {
        const res = await deleteWatchLaterService(auth.token, id);
        dispatchWatchList({ type: "SET_WATCHLATER", payload: res.watchlater });
        toast.info("Removed from watch later!");
      } else navigate("/login");
    } catch (e) {
      toast.error("Error in removing from watch later");
    }
  };
  return (
    <WatchLaterContext.Provider
      value={{ watchList, dispatchWatchList, getWatchLater, createWatchLater, deleteWatchLater }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);

export { useWatchLater, WatchLaterProvider };
