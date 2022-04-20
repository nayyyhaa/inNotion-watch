import { createContext, useReducer, useContext } from "react";
import { historyReducer } from "reducers/historyReducer";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [history, dispatchHistory] = useReducer(historyReducer, []);

  return <HistoryContext.Provider value={{ history, dispatchHistory }}>{children}</HistoryContext.Provider>;
};

const useHistory = () => useContext(HistoryContext);

export { useHistory, HistoryProvider };
