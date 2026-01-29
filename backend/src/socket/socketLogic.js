import { Server } from "socket.io";

export const socketLogic = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connection made.");

    // User joins a room
    socket.on("join", ({ roomId, userName }) => {
      socket.roomId = roomId;
      socket.userName = userName;

      socket.join(roomId);

      socket.emit("joinSuccess", { userName });
      console.log(`${userName} joined room: ${roomId}`);

      socket.to(roomId).emit("userJoined", { userName });
    });

    // User sends a message
    socket.on("sendMessage", ({ message }) => {
      const { roomId, userName } = socket;

      io.to(roomId).emit("message", {
        userName,
        message,
      });
    });

    socket.on("disconnect", () => {
      console.log("Connection disconnected.");
    });
  });

  return io;
};
