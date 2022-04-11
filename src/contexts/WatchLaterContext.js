import { createContext, useReducer, useContext } from "react";
import { watchLaterReducer } from "reducers/watchLaterReducer";

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const [watchList, dispatchWatchList] = useReducer(watchLaterReducer, []);

  return <WatchLaterContext.Provider value={{ watchList, dispatchWatchList }}>{children}</WatchLaterContext.Provider>;
};

const useWatchLater = () => useContext(WatchLaterContext);

export { useWatchLater, WatchLaterProvider };
