import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext();
export const authContextActions = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("auth"));
    setAuth(userData);
  }, []);
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <authContext.Provider value={auth}>
      <authContextActions.Provider value={setAuth}>
        {children}
      </authContextActions.Provider>
    </authContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(authContext);
export const useAuthContextActions = () => useContext(authContextActions);
