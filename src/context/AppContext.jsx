import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [algorithms, setAlgorithms] = useState([]);


  return (
    <AppContext.Provider
      value={{
        algorithms
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
