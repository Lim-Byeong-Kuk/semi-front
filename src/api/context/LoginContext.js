import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogin: "",
    id: "",
  });

  const login = ({ id, pwd }) => {
    setUser({ isLogin: true, id, pwd });
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("loginUser", id);
  };
  const logout = () => {
    setUser({
      isLogin: false,
      id: "",
    });
    localStorage.removeItem("isLogin");
    localStorage.removeItem("loginUser");
  };
  const loginCheck = () => {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
    const id = localStorage.getItem("loginUser");
    setUser({
      isLogin: isLogin,
      id: id,
    });
  };

  return (
    <LoginContext.Provider value={{ user, login, logout, loginCheck }}>
      {children}
    </LoginContext.Provider>
  );
};
