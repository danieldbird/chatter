const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 3001;

const io = require("socket.io")(http, { cors: {} });

let globalId = 0;

function logMessage(message, data) {
  console.log(message, data);
}

function emitRooms() {
  const filtered = [...io.sockets.adapter.rooms].filter((room) => !room[1].has(room[0]));
  const res = filtered.map((i) => {
    return { name: i[0], userId: [...i[1].values()][0], members: i[1].size };
  });
  io.emit("rooms", res);
}

io.on("connection", (socket) => {
  socket.on("clientJoinRoom", () => {
    logMessage("Client joined room:", socket.id);
    socket.join(String(globalId++));
    emitRooms(socket);
  });

  socket.on("adminJoinRoom", (room) => {
    logMessage("Admin joined room:", room);
    socket.join(room);
    emitRooms(socket);
  });

  socket.on("leaveRoom", () => {
    logMessage("Leave room: ", socket.id);
    socket.leave([...socket.rooms][1]);
    emitRooms(socket);
  });

  socket.on("disconnect", () => {
    logMessage("Disconnected:", socket.id);
    emitRooms(socket);
  });
});

http.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
