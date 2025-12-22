// socket/socket.js
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send_message", (message) => {
      io.to(message.conversationId).emit("receive_message", message);
    });

    socket.on("typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("typing", userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export const getIO = () => io;
