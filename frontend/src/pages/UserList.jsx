import React from "react";

const UserList = ({ usersOnline }) => {
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
    <div className="w-80 bg-white shadow-xl rounded-r-2xl flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-2xl">
        <h1 className="text-2xl font-bold mb-1">Chat App</h1>
        <p className="text-blue-100 text-sm">Connected and ready to chat</p>
      </div>

      {/* Online Users */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="font-semibold text-gray-700 mb-4 text-lg">
          Online Users ({usersOnline.filter(u => u.status === 'online').length})
        </h3>
        <div className="space-y-3">
          {usersOnline.map((user, index) => (
            <div
              key={index}
              className={`flex items-center p-3 rounded-xl transition-all ${
                user.isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                    user.status
                  )} rounded-full border-2 border-white`}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.status}</p>
              </div>
              {user.isActive && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current User Status */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
          <p className="text-sm text-gray-600">
            <span className="font-medium">You</span> are online
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserList;