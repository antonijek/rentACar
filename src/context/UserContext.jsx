import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { set, get, clear, exists } from "../services/storageServices";
import { getCurrentUser } from "../services/userServices";
import { storageKeys } from "../config/config";
import { logout } from "../services/authServices";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      if (exists(storageKeys.USER)) {
        const res = await getCurrentUser();
        setUser(res);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await logout();
      setUser(null);
      clear();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        logout: () => logout(),
        user: user,
        setUser: setUser,
        getUser: () => getUser(),
        logoutUser: () => logoutUser(),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const userData = () => {
  return useContext(UserContext);
};

export default UserProvider;
