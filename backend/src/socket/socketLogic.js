// import dotenv from "dotenv"
// dotenv.config()
import { Server } from "socket.io";
import { socketAuth } from "../middlewares/socketAuth.js";
// message services

import { handleOnlineUsers, handleOfflineUser } from "../realTime/user.socket.js";
import { createMessage } from "../features/message/message.service.js";
import { createMessageRepository } from "../features/message/message.repository.js";
export const socketLogic = (server) => {

  const io = new Server(server, {
    cors: {
      // origin: process.env.FRONTEND_URI,
         origin:["http://localhost:5173","https://talkmate-ezzq.onrender.com"],
      methods: ["GET", "POST"],
      // credentials: true,
    },
  });
  io.use(socketAuth);
  io.on("connection", async (socket) => {
      // console.log("CONNECTED", socket.id);

  // socket.onAny((event, ...args) => {
  //   console.log("EVENT:", event, args);
  // });

    console.log("socket connected")
 
    // typing indicator
    // on Typing
    socket.on("typing", ({ name, roomId, userId }) => {
      socket.broadcast.to(roomId).emit("userTyping", { userId, name })
    })

    //  on STop Typing
    socket.on("stop-typing", ({ name, roomId, userId }) => {
      socket.broadcast.to(roomId).emit("userStopTyping", { userId, name })
    })

    socket.on("join-room", async ({ roomId, userName,roomType }, ack) => {
      socket.roomId = roomId;
      socket.userName = userName;
      socket.roomType
      console.log("roomid", roomId, userName)
      socket.join(roomId);
         try {
      await handleOnlineUsers(socket)
    } catch (error) {
      console.log(error)
    }

      // try {
      //   const messageData = { roomId, message: `${userName} has joined the Chat`, messageType: "join" }
      //   const message = await createMessageRepository(messageData)
      //   // console.log("messagessdasdasd", message)

      //   if (message?.success) {
      //     ack?.({
      //       message
      //     })
      //   }
      // } catch (error) {
      //   ack?.({
      //     success: false,
      //     message: "failed to join room",
      //     error: error?.message,
      //   })
      // }
      // socket.emit("joinSuccess", { userName });
      // socket.to(roomId).emit("userJoined", message);
    });
    

    socket.on("sendMessage", async ({ message, senderName, attachments,roomId,senderId }, ack) => {
      // const { roomId, userName } = socket
    console.log("send message triggered",  message, senderName, attachments,roomId)
   
      try {
        //  console.log("my website",socket.user.id)

        // let userId = socket.user.id
        const messageData = { roomId, senderId:senderId, senderName, message, attachments }
         console.log("my websiteffff")
        const messageSaved = await createMessageRepository(messageData)
         
        console.log("messagesaved",messageSaved.success)
        io.to(roomId).emit("message", messageSaved)

        if(messageSaved?.success){
          console.log("messaged saved block triggered")
 ack?.({
          messageSaved
        })

        }

       


      } catch (error) {

        ack?.({
          success: false,
          message: "Failed to send message",
          error: error.message
        })
      }

    })

    socket.on("disconnect", async () => {
      try {
        await handleOfflineUser(socket)
      } catch (error) {
        console.error("disconnection problem")
      }
      console.log("socket disconnected");
    });
  });

  return io;
};



