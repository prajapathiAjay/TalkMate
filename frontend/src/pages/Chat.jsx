import React, { useState, useRef, useEffect } from "react";
import socket from "../Socket.jsx";
import UserList from "./UserList";
import JoinRoom from "./JoinRoom";
import ChatHeader from "./ChatHeader";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { useAuth } from "../contexts/AuthProvider.jsx";
import CustomeApiService from "../services/CustomApiService.jsx";
import MessageTypingIndicator from "./MessageTypingIndicator.jsx";
import OnlineUsers from "./OnlineUsers.jsx";
import { Trophy } from "lucide-react";
import FormLayoOut from "../components/FormLayoOut.jsx";
import { toast } from "sonner";


const Chat = () => {
  const { GET } = CustomeApiService();
  const { userData,chatRoomId,roomType } = useAuth();
  console.log("dataroom",userData,chatRoomId)
  let userId = userData?.user?.userId;
  let userName = userData?.user?.name;
  // let chatRoomId = userData?.user?.publicRoomId;
  console.log("User Data in Chat Component:", userData);
  const [currentUser, setCurrentUser] = useState(userData?.user?.userId);
  const [messages, setMessages] = useState([]);
  console.log("messagesss",messages)
  const [editRoom,setEditRoom] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  // const [roomType, setRoomType] = useState("public");
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  // const [chatRoomId, setRoomId] = useState(chatRoomId || null);
  console.log("currentUser", currentUser);
  const messagesEndRef = useRef(null);
  // console.log("sendt message", newMsg);

  // Socket event handlers
  // const handleUserJoined = ({ userName }) => {
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     {
  //       type: "joining message",
  //       text: `${userName} has joined df;gfdthe chat.`,
  //       time: new Date().toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //     },
  //   ]);
  // };

  const handleJoinSuccess = ({ userName }) => {
    setCurrentUser(userName);
  };

  const handleJoinRoom = (res) => {
      console.log("handleJoin",res)
    if (res?.message?.success) {
    console.log("handle join trigger",res?.message?.data)
          //  toast.success(`${res?.message?.data?.message}`);
      setMessages((prevMessages) => [...prevMessages, res?.message?.data]);
    } else {
      console.log("unable to join room");
    }
  };
  const handleMessage = (message) => {
    console.log("handle message invoked", message);
    if (message?.success) {
      console.log("Received message from server:", message.data);
      setMessages((prevMessages) => [...prevMessages, message.data]);
    }
  };

  const fetchAllMessages = async () => {
  const params={
    roomId:chatRoomId
  }

    try {
      const response = await GET(
        "messages/getMessages",
       params,
        {},
        {},
      );

      if (response?.success) {
        console.log("responsemessage", response);
        const allMessages = response?.data;
        setMessages([...allMessages]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // const fectchRoomData = async () => {
  //   try {
  //     const response = await GET();
  //     rooms;
  //   } catch (error) {
  //     console.error("Error fetching room data:", error);
  //   }
  // };
  

  useEffect(() => {
    fetchAllMessages();
  }, []);



useEffect(()=>{
setMessages([])
 fetchAllMessages();
},[chatRoomId])

  // console.log("Messagest", messages);


//   useEffect(() => {
//        console.log("JOIN EFFECT", {
//     currentUser,
//     chatRoomId,
//     connected: socket.connected,
//   });

//      if (!currentUser || !chatRoomId) return;
// console.log("Socket connected?", socket.connected,socket.id);
//  socket.on("connect", () => {
//     console.log("Connected:",socket.connected, socket.id);
//      socket.emit(
//       "join-room",
//       { chatRoomId: chatRoomId, userName: userName },
//       handleJoinRoom,
//     );
//   });
//     // socket.on("user-status-changed", handleStatusChange);
   
//     socket.on("userJoined");
//     // socket.on("joinSuccess", handleJoinSuccess);
//     socket.on("message", handleMessage);
//     // socket.on("user-status-changed",handleUserStatus)
//     socket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error.message);
//     });
//     socket.on("disconnect", (reason) => {
//       console.log("Client detected disconnect:", reason);
//     });

//     return () => {
//       socket.off("userJoined");
//       // socket.off("joinSuccess", handleJoinSuccess);
//       socket.off("message", handleMessage);
//     };
//   }, [currentUser, chatRoomId]);


useEffect(() => {
  console.log("JOIN EFFECT", {
    currentUser,
    chatRoomId,
    connected: socket.connected,
  });

  if (!currentUser || !chatRoomId) return;

  const joinRoom = () => {
    console.log("Joining Room...");
    console.log("Socket connected?", socket.connected, socket.id);

    socket.emit(
      "join-room",
      {
       roomId: chatRoomId,
        userName,
        roomType  
      },
      handleJoinRoom
    );
  };

  // If socket is already connected
  if (socket.connected) {
    joinRoom();
  }

  // If socket reconnects later
  socket.on("connect", joinRoom);

  // Message listener
  socket.on("message", handleMessage);

  // Optional listeners
  socket.on("userJoined", (data) => {
    console.log("User Joined:", data);
  });

  const handleConnectError = (error) => {
    console.error("Socket connection error:", error.message);
  };

  const handleDisconnect = (reason) => {
    console.log("Client detected disconnect:", reason);
  };

  socket.on("connect_error", handleConnectError);
  socket.on("disconnect", handleDisconnect);

  return () => {
    socket.off("connect", joinRoom);
    socket.off("message", handleMessage);
    socket.off("userJoined");
    socket.off("connect_error", handleConnectError);
    socket.off("disconnect", handleDisconnect);
  };
}, [currentUser, chatRoomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const handleCreateRoom = (data) => {
    console.log("Joining with data:", data);

    const payload = {
      roomName: data.roomName,
      type: "group",
      // createdBy:
    };

    socket.emit("createRoom", { roomName: data.roomName });
  };

  const handleShowOnlineUsers = () => {
    console.log("show online users");
    setShowOnlineUsers((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Left Sidebar - User List */}
      {/* <UserList usersOnline={usersOnline} /> */}

      {/* Middle - Join Room / Welcome */}
      {/* Right - Main Chat Area */}
      <div
        className={`flex-1 flex flex-col ${!currentUser ? "opacity-50 pointer-events-none" : ""}`}
      >
        <ChatHeader handleShowOnlineUsers={handleShowOnlineUsers} />

        {/* Messages Container-scrolling container */}
        {/* <div className="flex-1  overflow-y-auto bg-linear-to-b from-white to-gray-50 p-6"> */}
        <div
          className="flex-1   overflow-y-auto bg-linear-to-b from-white to-gray-50 p-6"
          onScroll={(e) => {
            const { scrollTop, scrollHeight, clientHeight } = e.target;
            setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 50);
          }}
        >
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p className="text-lg font-medium">No messages yet</p>
                  <p className="text-sm">
                    Start a conversation by sending a message!
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <MessageItem
                  key={index}
                  msg={msg}
                  currentUser={currentUser}
                  prevMessage={messages[index - 1]}
                />
              ))
            )}
            <MessageTypingIndicator />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <MessageInput disabled={!currentUser} roomType={roomType} />
      </div>
      {/* <JoinRoom onJoin={handleCreateRoom} currentUser={currentUser} /> */}
      <OnlineUsers showOnlineUsers={showOnlineUsers} handleShowOnlineUsers={handleShowOnlineUsers} />
      {editRoom && <FormLayoOut />}

    </div>
  );
};

export default Chat;


