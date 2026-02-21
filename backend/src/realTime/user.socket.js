import { handleOnlineUsersrepo } from "../features/user/user.reposotory.js"

const onlineUsers = new Map()

export const handleOnlineUsers = async (socket) => {
   console.log("handleOnline triggear")
   try {
      const userId = socket.user.id
      let isFirstConnection = false

      if (!onlineUsers.has(userId)) {
         onlineUsers.set(userId, new Set())
         isFirstConnection = true
      }

      onlineUsers.get(userId).add(socket.id)

      if (isFirstConnection) {
          const response=await handleOnlineUsersrepo(userId)
         console.log("response",response)
         socket.broadcast.emit("user-status-changed", response)
      }

   } catch (error) {
      console.error("Error in handleOnlineUsers:", error)
   }
}