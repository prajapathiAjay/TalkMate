import React from "react";

const MessageItem = ({ msg, currentUser }) => {
  const isCurrentUser = msg.sender === currentUser;
  const isJoinMessage = msg.type === "joining message";

  if (isJoinMessage) {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className="flex max-w-xl">
        {!isCurrentUser && (
          <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">
            {msg.sender?.charAt(0) || "U"}
          </div>
        )}
        
        <div
          className={`flex flex-col ${
            isCurrentUser ? "items-end" : "items-start"
          }`}
        >
          {!isCurrentUser && (
            <p className="font-semibold text-gray-700 text-sm mb-1 ml-1">
              {msg.sender}
            </p>
          )}
          
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              isCurrentUser
                ? "bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
          
          <span className="text-xs text-gray-500 mt-1 px-1">
            {msg.time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;