const { Server } = require("socket.io");

let io;

const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "*",
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