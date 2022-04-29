import { createContext, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { historyReducer } from "reducers/historyReducer";
import { createHistoryService, deleteHistoryService, getHistoryService } from "services";
import { useAuth } from "./AuthContext";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [history, dispatchHistory] = useReducer(historyReducer, JSON.parse(localStorage.getItem("user"))?.history ?? []);
  const { auth, user, setUser } = useAuth();
  const navigate = useNavigate();

  const getHistory = async () => {
    try {
      if (auth.isAuth) {
        const res = await getHistoryService(auth.token);
        dispatchHistory({ type: "SET_HISTORY", payload: res.history });
      } else navigate("/login");
    } catch (err) {
      toast.error("Error in getting history");
    }
  };

  const createHistory = async (video) => {
    try {
      if (auth.isAuth) {
        const res = await createHistoryService(auth.token, video);
        dispatchHistory({ type: "SET_HISTORY", payload: res.history });
      } else navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHistory = async (id) => {
    try {
      if (auth.isAuth) {
        const res = await deleteHistoryService(auth.token, id);
        dispatchHistory({ type: "SET_HISTORY", payload: res.history });
        toast.info("Removed from history!");
      } else navigate("/login");
    } catch (e) {
      toast.error("Error in removing from history");
    }
  };

  useEffect(() => {
    const newUserData = { ...user, history };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, dispatchHistory, getHistory, createHistory, deleteHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { useHistory, HistoryProvider };
