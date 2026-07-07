




// //////////////////////////////////////////////////////////////////////////////


import { handleOnlineUsersrepo } from "../features/user/user.reposotory.js";
import { createMessageRepository } from "../features/message/message.repository.js";
const onlineUsers = new Map();
const disconnectTimers = new Map();

export const handleOnlineUsers = async (socket) => {
   console.log("handleOnline trigger");

   try {
      const userId = socket?.user?.id;

      if (!userId) {
         console.error("User ID not found on socket");
         return;
      }

      // User reconnected before offline timer completed
      if (disconnectTimers.has(userId)) {
         clearTimeout(disconnectTimers.get(userId));
         disconnectTimers.delete(userId);
      }

      let isFirstConnection = false;

      if (!onlineUsers.has(userId)) {
         onlineUsers.set(userId, new Set());
         isFirstConnection = true;
      }

      onlineUsers.get(userId).add(socket.id);

      // if (isFirstConnection) {
      //    const response = await handleOnlineUsersrepo(true, userId);


      //    if (response.success) {
      //       console.log("EMITTING user-status-changed", response);
      //       socket.broadcast.emit("user-status-changed", response);
      //    }

      //    console.log("connectresponse", response);
      // }
      if (isFirstConnection) {
         const response = await handleOnlineUsersrepo(true, userId);

         if (response.success && socket.roomType !== "private") {
            const publicRoomId = response.publicRoomId; // Return this from your repository

            const userName = response.data.name;

            const message = await createMessageRepository({
               roomId: socket.roomId,
               message: `${userName} has joined the chat`,
               messageType: "join",
            });

            if (message.success) {
               socket.broadcast
                   .to(publicRoomId)
                   .emit("message", message);
          
               console.log("messahiim", message)
            }

         }
         
            socket.broadcast.emit("user-status-changed", message);
      }

   } catch (error) {
      console.error("Error in handleOnlineUsers:", error);
   }
};

export const handleOfflineUser = async (socket) => {
   try {
      const userId = socket.user?.id;

      if (!userId) {
         console.error("User ID not found on socket");
         return;
      }

      if (!onlineUsers.has(userId)) {
         return;
      }

      const userSockets = onlineUsers.get(userId);

      userSockets.delete(socket.id);

      // User still has another tab/device connected
      if (userSockets.size > 0) {
         return;
      }

      // Delay offline update
      const timer = setTimeout(async () => {
         try {
            // User came back before timer ended
            if (
               onlineUsers.has(userId) &&
               onlineUsers.get(userId).size > 0
            ) {
               disconnectTimers.delete(userId);
               return;
            }

            onlineUsers.delete(userId);

            const response = await handleOnlineUsersrepo(false, userId);

            if (!response.success) {
               disconnectTimers.delete(userId);
               return;
            }

            console.log("disconnectresponse", response);

            socket.broadcast.emit("user-status-changed", response);

            disconnectTimers.delete(userId);
         } catch (error) {
            console.error("Offline timer error:", error);
         }
      }, 5000); // 5 seconds

      disconnectTimers.set(userId, timer);
   } catch (error) {
      console.error("Error in handleOfflineUser:", error);
   }
};

export const isUserOnline = (userId) => {
   return onlineUsers.has(userId);
};

export const getUserSocketIds = (userId) => {
   return [...(onlineUsers.get(userId) || [])];
};