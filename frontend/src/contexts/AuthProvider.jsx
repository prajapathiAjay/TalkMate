import React from "react";
import { createContext, useState, useContext,useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(()=>{
    const availablUser=localStorage.getItem("userData");
    return availablUser ? JSON.parse(availablUser) : null;
  });

   useEffect(()=>{
    if(userData){
        localStorage.setItem("userData",JSON.stringify(userData));
    }else{
        localStorage.removeItem("userData");
    }
   },[userData]);

  const login = (data) => {
    setUserData(data);
  };
  const logout = () => {
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


export const useAuth = () => {
  return useContext(AuthContext);
};
