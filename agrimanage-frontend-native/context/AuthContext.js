import { createContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "../util/storageUtils";

export const AuthContext = createContext({
  token: null,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    getToken().then((res) => setUserToken(res));
  }, []);

  const logoutHandler = () => {
    removeToken().then();
    setUserToken(null);
  };

  const loginHandler = (token) => {
    setToken(token).then()
    setUserToken(token)
  };

  const temp = {
    token: userToken,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  };

  return <AuthContext.Provider value={temp}>{children}</AuthContext.Provider>;
};
