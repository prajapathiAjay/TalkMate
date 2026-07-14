import React, { useState, useEffect } from "react";
import {
  Users,
  Circle,
  Search,
  MoreVertical,
  MessageCircle,
  Wifi,
  WifiOff,
  Clock,
  Filter,
  X,
  Star,
  Crown,
  Zap,
  ChevronRight,
  ChevronLeft,
  Activity,
  Coffee,
  UserPlus2,
  Users2Icon,
  MessageSquareText,
  Handshake,
} from "lucide-react";
import { FormatLastSeen } from "../utilityFuntions/FormatLastSeen.js";
import CustomApiService from "../services/CustomApiService";
import socket from "../Socket.jsx";
import { useAuth } from "../contexts/AuthProvider.jsx";
import { toast } from "sonner";

const OnlineUsers = ({ showOnlineUsers, handleShowOnlineUsers }) => {
  const { GET, POST } = CustomApiService();
  const [allUsers, setAllUsers] = useState([]);
  const {
    userData,
    chatRoomId,
    roomType,
    handleChatRoomIdChange,
    handleRoomTypeChange,
    handlePartnerChange,
    // friendRoom,
    // handleFriendRoom

  } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [friendRoom, setFriendRoom] = useState([]);
  console.log("friendRoom", friendRoom);

  // search functionality

  const getAllUsers = async () => {
    try {
      const params = {};
      if (selectedFilter !== "all") {
        params.isOnline = selectedFilter;
      }
      if (searchTerm.trim() !== "") {
        params.name = searchTerm;
      }
      setIsLoading(true);
      const res = await GET("user/allUsers", params, {}, {});
      if (res?.success) {
        const allUsersData = res?.data;
        setAllUsers(allUsersData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (response) => {
    if (response.success) {
      let newJoinedUsers = response?.data;
      setAllUsers((prevUsers) => {
        const existingUser = prevUsers.some(
          (user) => user._id === newJoinedUsers._id,
        );
        if (existingUser) {
          return prevUsers.map((user) =>
            user._id === newJoinedUsers._id ? newJoinedUsers : user,
          );
        } else {
          return [newJoinedUsers, ...prevUsers];
        }
      });
    }
    console.log("handleStatus", response);
  };
  const createChatRoom = async (friendId) => {
    try {
      const payload = {
        type: "private",
        participants: [userData?.user?.userId, friendId],
      };

      const response = await POST("room/createRoom", {}, {}, payload);
      if (response?.success) {
        console.log("Chat room created successfully", response.data);
      }
    } catch (error) {
      console.log("Error creating chat room:", error);
    }
  };

  // Add as Friend Functionality

  const handleAddFriend = async (friendId) => {
    try {
      const payload = {
        friendId,
        userId: userData?.user?.userId,
      };

      const roomPayload = {
        type: "private",
        participants: [userData?.user?.userId, friendId],
      };

      const [roomResponse, friendResponse] = await Promise.all([
        POST("room/createRoom", {}, {}, roomPayload),
        POST("friend/add", {}, {}, payload),
      ]);

      if (roomResponse?.success) {
        console.log("Chat room created successfully", roomResponse.data);
      }

      if (friendResponse?.success) {
        toast.success(friendResponse.message);
        console.log("Friend added successfully", friendResponse);
      }

      if (roomResponse && friendResponse) {
        getAllUsers();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAllFriends = async () => {
    try {
      const response = await GET("friend/getFriends", {}, {}, {});

      if (response?.success) {
        setAllUsers(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPrivateRoom = async () => {
    try {
      const params = {
        type: "private",
        participants: [userData?.user?.userId],
      };
      if (searchTerm.trim() !== "") {
        params.name = searchTerm;
      }

      const response = await GET("room/private", params, {}, {});
      if (response.success) {
        setFriendRoom(
          response?.data.map((friend) => ({
            ...friend,
            isCurrent: false,
          })),
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    socket.on("user-status-changed", handleStatusChange);
  }, []);

  useEffect(() => {
    if (roomType === "private") {
      return;
    }
    handleRoomTypeChange("public");
    handleChatRoomIdChange(userData?.user?.publicRoomId);

    // Remove active friend selection
    setFriendRoom((prev) =>
      prev.map((friend) => ({
        ...friend,
        isCurrent: false,
      })),
    );
    handlePartnerChange(null);
  }, [roomType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedFilter === "friends") {
        getPrivateRoom();
      } else {
        getAllUsers();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedFilter === "friends") {
      getPrivateRoom();
    } else {
      getAllUsers();
    }
  }, [selectedFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case true:
        return "bg-gradient-to-r from-green-400 to-emerald-500";
      case false:
        return "bg-gradient-to-r from-yellow-400 to-amber-500";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "online":
        return <Zap className="w-3 h-3 text-green-500" />;
      case "away":
        return <Coffee className="w-3 h-3 text-yellow-500" />;
      default:
        return <WifiOff className="w-3 h-3 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "Active now";
      case "away":
        return "Away";
      default:
        return "Offline";
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case true:
        return "bg-green-100 text-green-700 border-green-200";
      case false:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const handleChatRoomChange = (room) => {
    handleChatRoomIdChange(room._id);
    handleRoomTypeChange("private");
    console.log("currentPartner", room);
    handlePartnerChange(room?.friend);
    setFriendRoom((prevFriends) =>
      prevFriends.map((friend) => ({
        ...friend,
        isCurrent: friend._id === room._id, // or friend._id === _id
      })),
    );
  };

  const onlineCount = allUsers.filter((u) => u.isOnline === true);
  const awayCount = allUsers.filter((u) => u.isOnline === false);
  const offlineCount = allUsers.filter((u) => u.status === "offline");

  // Featured users (for demo - you can modify based on your data)
  const featuredUsers = allUsers
    .filter((u) => u.isFeatured || u.isOnline === true)
    .slice(0, 3);

  return (
    <div
      className={`fixed inset-y-0 right-0 
        w-full md:w-96
        transform ${showOnlineUsers ? "translate-x-0" : "translate-x-full"}
        transition-all duration-400 ease-out
        bg-gradient-to-br from-indigo-50 via-white to-purple-50
        shadow-2xl
        md:relative md:translate-x-0
        flex flex-col
        border-l border-indigo-100
      `}
    >
      {/* Header with Gradient */}
      <div className="flex items-center   border-5 border-indigo-200 px-2 py-1 relative overflow-hidden">
        <div
          onClick={handleShowOnlineUsers}
          className="block md:hidden flex items-center h-full w-8 text-[#7736FB]  rounded-lg bg-white border-2 border-indigo-200 hover:bg-indigo-50 cursor-pointer justify-center mr-3"
        >
          <ChevronLeft className="w-5 h-4 " />
        </div>

        <div className="flex w-full justify-between gap-3">
  <button
    onClick={() => setSelectedFilter("all")}
    className={`flex-1 flex items-center justify-center text-sm cursor-pointer px-4 py-2 rounded-xl ${
      selectedFilter === "all"
        ? "bg-[#7736FB] border border-[#7736FB]/30 text-white"
        : "bg-white/20 border border-[#7736FB]/30 text-[#7736FB]"
    } font-semibold shadow-lg hover:bg-[#7736FB]/30 hover:scale-105 transition-all duration-300`}
  >
    <Users2Icon className="w-4 h-4 mr-2" />
    All Users
  </button>

  <button
    onClick={() => setSelectedFilter("friends")}
    className={`flex-1 flex items-center justify-center text-sm cursor-pointer px-4 py-2 rounded-xl ${
      selectedFilter === "friends"
        ? "bg-[#7736FB] border border-[#7736FB]/30 text-white"
        : "bg-white/20 border border-[#7736FB]/30 text-[#7736FB]"
    } font-semibold shadow-lg hover:bg-[#7736FB]/30 hover:scale-105 transition-all duration-300`}
  >
    <Handshake className="w-4 h-4 mr-2" />
    Friends
  </button>
</div>
      </div>

      {/* Search Section */}
      <div className="py-2 px-3 bg-[#7736FB]/20 rounded-b-2xl">
        <div className="relative group">
          {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" /> */}
          <input
            type="text"
            placeholder="Search amazing people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-gray-100 text-gray-800 placeholder-gray-400 rounded-2xl px-3 text-xs  py-2 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-5">
        <div className="space-y-2 pb-4">
          {isLoading ? (
            // Animated loading skeletons
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                    <div className="h-3 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  </div>
                </div>
              ))
          ) : selectedFilter === "friends" && friendRoom.length > 0 ? (
            <div className="space-y-3">
              {friendRoom.map((room) => (
                <div
                  key={room._id}
                  onClick={() => handleChatRoomChange(room)}
                  className={`group ${room.isCurrent === false ? "bg-white" : "bg-gray-300"} rounded-2xl border  border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 cursor-pointer transition-all duration-300 p-4`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7736FB] to-[#4F7CFF] flex items-center justify-center text-white text-xl font-bold">
                          {room?.friend?.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <span
                          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                            room?.friend?.isOnline
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>

                      {/* Name */}
                      <div>
                        <h2 className="font-bold text-lg text-gray-800">
                          {room?.friend?.name}
                        </h2>

                        <p
                          className={`text-sm ${
                            room?.friend?.isOnline
                              ? "text-green-500 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {room?.friend?.isOnline
                            ? "Online"
                            : ` ${FormatLastSeen(room?.friend?.lastSeen)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedFilter === "all" && allUsers.length > 0 ? (
            allUsers.map((user, index) => (
              <div
                key={user.id || index}
                className="group relative bg-white rounded-2xl p-4 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-100 cursor-pointer animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar with fancy ring */}
                  <div className="relative">
                    <div
                      className={`absolute inset-0 ${getStatusColor(user.isOnline)} rounded-2xl  opacity-50 group-hover:opacity-70 transition-opacity`}
                    ></div>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="relative w-14 h-14 rounded-2xl object-cover border-3 border-white "
                      />
                    ) : (
                      <div
                        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${user.isOnline ? "from-green-400 to-blue-500" : "from-gray-400 to-gray-500"} flex items-center justify-center text-white font-bold text-xl `}
                      >
                        {user?.name?.charAt(0).toUpperCase() ||
                          user?.friendId?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.isOnline)} rounded-full border-3 border-white `}
                    ></div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {user.name || user?.friendId?.name}
                      </h3>
                    </div>
                    {/* Activity or last seen */}
                    <p
                      className={`text-sm flex items-center gap-1 ${
                        user.isOnline ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {user.isOnline ? (
                        <>
                          <span>Online</span>
                        </>
                      ) : (
                        <span>{FormatLastSeen(user.lastSeen)}</span>
                      )}
                    </p>
                  </div>

                  {selectedFilter !== "friends" && !user?.isFriend && (
                    <button
                      onClick={() => handleAddFriend(user._id)}
                      className="absolute right-4 opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                      title="Add Friend"
                    >
                      <div className="text-[#7736FB] p-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-110">
                        <UserPlus2 className="w-4 h-4" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Empty state with illustration
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white rounded-full p-6 shadow-xl border-4 border-blue-50">
                  <Users className="w-16 h-16 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {selectedFilter==="all"?"No Users":"Add user as friend from all users list"}
                No users found
              </h3>
              <p className="text-gray-500 max-w-[220px]">
                {searchTerm
                  ? "No matches for your search"
                  : "Be the first to join the community!"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer with stats */}
      <div className="bg-white border-t border-gray-100 px-5 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                {onlineCount?.length} online
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                {awayCount?.length} away
              </span>
            </div>
           
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold text-blue-600">{allUsers.length}</span>
            <span className="text-gray-400">/ {allUsers.length}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide {
          animation: slide 2s infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 20px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #60a5fa, #a78bfa);
          border-radius: 20px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
        }
      `}</style>
    </div>
  );
};

export default OnlineUsers;
