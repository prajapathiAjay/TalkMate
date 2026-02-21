import { Server } from "socket.io";
import { socketAuth } from "../middlewares/socketAuth.js";
// message services

import { handleOnlineUsers } from "../realTime/user.socket.js";
import { createMessage } from "../features/message/message.service.js";
export const socketLogic = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.use(socketAuth);
  io.on("connection",async (socket) => {
    console.log("socket connected")
 try {
  await handleOnlineUsers(socket)
 } catch (error) {
  console.log(error)
 }
   

   


    socket.on("join", ({ publicRoomId, userName }) => {
      socket.roomId = publicRoomId;
      socket.userName = userName;

      socket.join(publicRoomId);

      socket.emit("joinSuccess", { userName });
      socket.to(publicRoomId).emit("userJoined", { userName });
    });

    socket.on("sendMessage", async ({ message, senderName }, ack) => {
      const { roomId, userName } = socket
      try {
        let userId = socket.user.id
        const messageData = { roomId, senderId: userId, senderName, message }
        const messageSaved = await createMessage(messageData)
        io.to(roomId).emit("message", messageSaved)


        ack?.({
          messageSaved
        })


      } catch (error) {

        ack?.({
          success: false,
          message: "Failed to send message",
          error: error.message
        })
      }

    })

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
  });

  return io;
};



