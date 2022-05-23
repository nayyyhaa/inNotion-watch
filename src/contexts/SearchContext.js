import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchIp, setSearchIp] = useState("");

  return <SearchContext.Provider value={{ searchIp, setSearchIp }}>{children}</SearchContext.Provider>;
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
