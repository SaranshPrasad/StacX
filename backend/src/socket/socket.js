const { Server } = require("socket.io");

let io;
require("dotenv").config();
const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {

    console.log("⚡ User connected");

    socket.on("send_message", (data) => {

      io.emit("receive_message", data);

    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });
  });

  return io;
};

module.exports = initSocket;