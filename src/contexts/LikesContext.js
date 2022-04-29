import { createContext, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { likesReducer } from "reducers/likesReducer";
import { createLikesService, deleteLikesService, getLikesService } from "services";
import { useAuth } from "./AuthContext";

const LikesContext = createContext();

const LikesProvider = ({ children }) => {
  const [likes, dispatchLikes] = useReducer(likesReducer, JSON.parse(localStorage.getItem("user"))?.likes ?? []);
  const { auth, user, setUser } = useAuth();
  const navigate = useNavigate();

  const getLikes = async () => {
    try {
      if (auth.isAuth) {
        const res = await getLikesService(auth.token);
        dispatchLikes({ type: "SET_LIKES", payload: res.likes });
      } else navigate("/login");
    } catch (err) {
      toast.error("Error in getting liked videos");
    }
  };

  const createLikes = async (video) => {
    try {
      if (auth.isAuth) {
        const res = await createLikesService(auth.token, video);
        dispatchLikes({ type: "SET_LIKES", payload: res.likes });
        toast.success("Added to liked videos!");
      } else navigate("/login");
    } catch (err) {
      toast.error("Error in adding to liked videos");
    }
  };

  const deleteLikes = async (id) => {
    try {
      if (auth.isAuth) {
        const res = await deleteLikesService(auth.token, id);
        dispatchLikes({ type: "SET_LIKES", payload: res.likes });
        toast.info("Removed from liked videos!");
      } else navigate("/login");
    } catch (e) {
      toast.error("Error in removing from liked videos");
    }
  };

  useEffect(() => {
    const newUserData = { ...user, likes };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  }, [likes]);

  return (
    <LikesContext.Provider value={{ likes, dispatchLikes, getLikes, createLikes, deleteLikes }}>
      {children}
    </LikesContext.Provider>
  );
};

const useLikes = () => useContext(LikesContext);

export { useLikes, LikesProvider };
