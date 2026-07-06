import React from "react";
import { createContext, useState, useContext,useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log("AuthProvider file loaded");
  const [userData, setUserData] = useState(()=>{
    const availablUser=localStorage.getItem("userData");
    return availablUser ? JSON.parse(availablUser) : null;
  });

  
  const [roomType, setRoomType] = useState(() => {
    const availableRoomType = localStorage.getItem("roomType");
    return availableRoomType ? availableRoomType : "public";
  });



  const [chatRoomId,setChatRoomId]=useState(()=>{

const availableRoomId=localStorage.getItem("chatRoomId");
return  localStorage.getItem("chatRoomId");

  })
 console.log("chatroom Id",chatRoomId)
   useEffect(()=>{
    if(userData){
        localStorage.setItem("userData",JSON.stringify(userData));
    }else{
        localStorage.removeItem("userData");
    }
   
   },[userData]);

   const handleChatRoomIdChange = (newChatRoomId) => {
    setChatRoomId(newChatRoomId);
     localStorage.setItem("chatRoomId", newChatRoomId)
  }

   useEffect(() => {
  if (chatRoomId) {
    localStorage.setItem("chatRoomId", chatRoomId);
  } else {
    localStorage.removeItem("chatRoomId");
  }
}, [chatRoomId]);

const handleRoomTypeChange = (newRoomType) => {
  
    setRoomType(newRoomType);
    localStorage.setItem("roomType", newRoomType);
  }

  const login = (data) => {
    setUserData(data);
    setChatRoomId(data?.user?.publicRoomId || null);
    setRoomType("public");
  };
  const logout = () => {
    setUserData(null);
    setChatRoomId(null);
    setRoomType(null);
  };

  return (
    <AuthContext.Provider value={{ userData, chatRoomId,roomType,setRoomType, login, logout,handleChatRoomIdChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


export const useAuth = () => {
  return useContext(AuthContext);
};
