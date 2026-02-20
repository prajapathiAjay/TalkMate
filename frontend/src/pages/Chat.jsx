import React, { useState, useRef, useEffect } from "react";
import socket from "../Socket.jsx";
import UserList from "./UserList";
import JoinRoom from "./JoinRoom";
import ChatHeader from "./ChatHeader";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import { useAuth } from "../contexts/AuthProvider.jsx";
import CustomApiService from "../services/CustomApiService.jsx";

const Chat = () => {
  const { GET } = CustomApiService();
  const { userData } = useAuth();
  let userId = userData?.user?.userId;
  let publicRoomId = userData?.user?.publicRoomId;
  console.log("User Data in Chat Component:", userData);
  const [currentUser, setCurrentUser] = useState(userData?.user?.userId);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [roomType, setRoomType] = useState("public");
  const messagesEndRef = useRef(null);
  console.log("sendt message", newMsg);

  const usersOnline = [
    { name: "Alice", status: "online", isActive: true },
    { name: "Bob", status: "online", isActive: false },
    { name: "Charlie", status: "away", isActive: false },
    { name: "Diana", status: "online", isActive: false },
    { name: "Eve", status: "offline", isActive: false },
  ];

  // Socket event handlers
  const handleUserJoined = ({ userName }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "joining message",
        text: `${userName} has joined the chat.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleJoinSuccess = ({ userName }) => {
    setCurrentUser(userName);
  };

  const handleMessage = (message) => {
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   {
    //     sender: userName,
    //     text: message,
    //     time: new Date().toLocaleTimeString([], {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     }),
    //   },
    // ]);

    if (message?.success) {
      console.log("Received message from server:", message.data);
      setMessages((prevMessages) => [...prevMessages, message.data]);
    }
  };
  const fetchAllMessages = async () => {
    try {
      const response = await GET(
        "messages/getMessages",
        { type: roomType },
        {},
        {},
      );

      if (response?.success) {
        console.log("response", response);
        const allMessages = response?.data;
        setMessages([...allMessages]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  console.log("Messagest", messages);
const handleStatusChange=(data)=>{
console.log("handleStatus",data)
}


  useEffect(() => {
    if (!currentUser) return;
    socket.on("user-status-changed",handleStatusChange);
    socket.emit("join", { publicRoomId: publicRoomId, userName: currentUser });
    socket.on("userJoined", handleUserJoined);
    socket.on("joinSuccess", handleJoinSuccess);
    socket.on("message", handleMessage);
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    return () => {
      socket.off("userJoined", handleUserJoined);
      socket.off("joinSuccess", handleJoinSuccess);
      socket.off("message", handleMessage);
    };
  }, [currentUser, publicRoomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const messageData = {
      senderId: userId,
      senderName: userData?.user?.name,
      message: newMsg,
    };
    console.log("messageData", messageData);
    if (roomType === "public") {
      messageData.roomId = publicRoomId;
    }

    socket.emit("sendMessage", messageData, (res) => {
      console.log("server", res);
    });
    // console.log("Message sent:", res);
    setNewMsg("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCreateRoom = (data) => {
    console.log("Joining with data:", data);

    const payload = {
      roomName: data.roomName,
      type: "group",
      // createdBy:
    };

    socket.emit("createRoom", { roomName: data.roomName });
  };

  return (
    <div className="flex h-screen w-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Left Sidebar - User List */}
      {/* <UserList usersOnline={usersOnline} /> */}

      {/* Middle - Join Room / Welcome */}
      <JoinRoom onJoin={handleCreateRoom} currentUser={currentUser} />

      {/* Right - Main Chat Area */}
      <div
        className={`flex-1 flex flex-col ${!currentUser ? "opacity-50 pointer-events-none" : ""}`}
      >
        <ChatHeader />

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-linear-to-b from-white to-gray-50 p-6">
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
                <MessageItem key={index} msg={msg} currentUser={currentUser} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <MessageInput
          newMsg={newMsg}
          setNewMsg={setNewMsg}
          onSend={sendMessage}
          onKeyPress={handleKeyPress}
          disabled={!currentUser}
        />
      </div>
    </div>
  );
};

export default Chat;
