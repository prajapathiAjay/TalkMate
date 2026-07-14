import React from "react";
import { createContext, useState, useContext,useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log("AuthProvider file loaded");
  const [userData, setUserData] = useState(()=>{
    const availablUser=localStorage.getItem("userData");
    return availablUser ? JSON.parse(availablUser) : null;
  });
  
const [currentPartner,setCurrentPartner]=useState(()=>{

  const availablePartner=localStorage.getItem("currentPartner")
  return availablePartner?JSON.parse(availablePartner):{type:"public"}
})
  

const [friendRoom,setFriendRoom]=useState(()=>{

  const availableFriends=localStorage.getItem("friendRoom")
  return availableFriends?JSON.parse(availableFriends):[]
})


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
    console.log("roomId change function")
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


const handlePartnerChange=(data)=>{
setCurrentPartner(data)
localStorage.setItem("currentPartner",JSON.stringify(data))

}

const handleFriendRoom=(data,initial)=>{
setFriendRoom(data)
localStorage.setItem("friendRoom",JSON.stringify(data))

}

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
    localStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ userData,friendRoom,handleFriendRoom, chatRoomId,roomType,setRoomType, login,handleRoomTypeChange, logout,handleChatRoomIdChange,handlePartnerChange,currentPartner }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


export const useAuth = () => {
  return useContext(AuthContext);
};
