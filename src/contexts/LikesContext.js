import { createContext, useReducer, useContext } from "react";
import { likesReducer } from "reducers/likesReducer";

const LikesContext = createContext();

const LikesProvider = ({ children }) => {
  const [likes, dispatchLikes] = useReducer(likesReducer, []);

  return <LikesContext.Provider value={{ likes, dispatchLikes }}>{children}</LikesContext.Provider>;
};

const useLikes = () => useContext(LikesContext);

export { useLikes, LikesProvider };
