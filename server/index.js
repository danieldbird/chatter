const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 3001;

const io = require("socket.io")(http, { cors: {} });

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);
  socket.on("disconnect", async () => {
    console.log("Disconnected: ", socket.id);
  });
});

app.get("/test", (req, res) => {
  return res.json({ name: "Daniel Bird" });
});

http.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
