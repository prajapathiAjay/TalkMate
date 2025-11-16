import React, { useState, useRef, useEffect } from "react";
import socket from "../Socket.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Chat = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yup.object().shape({})),
  });

  const [messages, setMessages] = useState([
    {
      sender: "Alice",
      text: "Hey there! How are you doing today? 😊",
      time: "10:30 AM",
    },
    {
      sender: "You",
      text: "Hi Alice! I'm doing great, thanks for asking. How about you? 👋",
      time: "10:31 AM",
    },
    { sender: "Bob", text: "Hey everyone! What's up?", time: "10:32 AM" },
    {
      sender: "Alice",
      text: "Just working on some React projects. This chat UI looks amazing! 💻",
      time: "10:33 AM",
    },
  ]);

  useEffect(() => {
    socket.on("userJoined", ({ userName }) => {
      console.log("User Joined:", userName);
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
    });

    socket.on("message", ({ userName, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: userName,
          text: message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });
  }, []);

  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  const usersOnline = [
    { name: "Alice", status: "online", isActive: true },
    { name: "Bob", status: "online", isActive: false },
    { name: "Charlie", status: "away", isActive: false },
    { name: "Diana", status: "online", isActive: false },
    { name: "Eve", status: "offline", isActive: false },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    socket.emit("sendMessage", { message: newMsg });

    // setMessages([
    //   ...messages,
    //   {
    //     sender: "You",
    //     text: newMsg,
    //     time: currentTime,
    //   },
    // ]);
    setNewMsg("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const handleUserJoin = (data) => {
    socket.emit("join", { userName: data.name, roomId: data.roomId });

    console.log("User Join Data:", data);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* LEFT SIDEBAR */}
      <div className="w-80 bg-white shadow-xl rounded-r-2xl flex flex-col border-r border-gray-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-2xl">
          <h1 className="text-2xl font-bold mb-1">Chat App</h1>
          <p className="text-blue-100 text-sm">Connected and ready to chat</p>
        </div>
      </div>
      <div className="w-[400px] h-screen bg-blue-300">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit(handleUserJoin)}
            className="p-6 bg-blue-500 text-white rounded-tr-2xl"
          >
            <h1 className="text-2xl font-bold mb-1">Welcome to TalkMate</h1>
            <p className="text-blue-100 text-sm">
              Connect with friends and the world around you.
            </p>
            <div className="flex flex-col space-y-4">
              <div>
                <input
                  {...register("name")}
                  placeholder="Enter u r name"
                  className=" h-10 w-full rounded-md border border-gray-300 px-3 bg-red-400"
                />
              </div>
              <div>
                <input
                  {...register("roomId")}
                  placeholder="Enter room iD"
                  className=" h-10 w-full rounded-md border border-gray-300 px-3 bg-red-400"
                />
              </div>
              <button className="p-4 bg-blue-950 rounded full">
                Join Chat
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  G
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Group Chat</h2>
                <p className="text-sm text-gray-500">
                  Alice, Bob, Charlie, and 2 others
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50 p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex max-w-xl">
                {msg.sender !== "You" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 mt-1">
                    {msg.sender}
                  </div>
                )}
                <div
                  className={`flex flex-col ${
                    msg.sender === "You" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "You"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                    }`}
                  >
                    {msg.sender !== "You" && (
                      <p className="font-semibold text-sm mb-1">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pl-12 bg-gray-50 border text-black border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={sendMessage}
                disabled={!newMsg.trim()}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  newMsg.trim()
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
