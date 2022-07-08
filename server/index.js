const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 3001;

const io = require("socket.io")(http, { cors: {} });

let globalId = 0;

// function handleClientConnect(socket) {
//   console.log("Connected:", socket.id, new Date());
//   socket.join(globalId++);
//   emitRooms(socket);
// }

// function handleClientDisconnect(socket) {
//   console.log("Disconnected:", socket.id, new Date());
//   emitRooms(socket);
// }

// function emitRooms(socket) {
//   io.emit("rooms", io.sockets.adapter.rooms);
// }

io.on("connection", (socket) => {
  socket.on("joinRoom", () => {
    console.log("Join room:", socket.id);
    socket.join(String(globalId++));

    const arr = Array.from(io.sockets.adapter.rooms);
    const filtered = arr.filter((room) => !room[1].has(room[0]));
    const res = filtered.flatMap((i) => {
      return { name: i[0], userId: [...i[1].values()][0] };
    });
    io.emit("rooms", res);
  });

  socket.on("leaveRoom", () => {
    console.log("Leave room: ", socket.id);
    const roomArr = Array.from(io.sockets.adapter.rooms);
    const roomArrFiltered = roomArr.filter((room) => !room[1].has(room[0]));
    socket.leave(roomArrFiltered[0][0]);
    const arr = Array.from(io.sockets.adapter.rooms);
    const filtered = arr.filter((room) => !room[1].has(room[0]));
    const res = filtered.flatMap((i) => {
      return { name: i[0], userId: [...i[1].values()][0] };
    });
    io.emit("rooms", res);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
