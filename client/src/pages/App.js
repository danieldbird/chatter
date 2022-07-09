import { useEffect, useState } from "react";

import socketClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState("");
  const [roomId, setRoomId] = useState(uuidv4());

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function joinRoom() {
    setSocketConnected(true);
    setSocketId(socket.id);
    socket.emit("clientJoinRoom", roomId);
  }

  function leaveRoom() {
    setSocketConnected(false);
    setSocketId("");
    socket.emit("leaveRoom");
  }

  useEffect(() => {
    const socket = socketClient("http://localhost:3001");
    setSocket(socket);
    socket.on("message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("sendClientMessage", message, roomId, () => setMessage(""));
    setMessage("");
  }

  return (
    <>
      <div className="flex h-full flex-col py-1">
        <div className=" bg-gray-100 grow flex justify-end flex-col px-12 py-6">
          {messages.length > 0 ? (
            messages.map((msg, i) => {
              return (
                <div key={i} className={msg.type === "admin" ? "text-green-500" : "text-blue-500"}>
                  {msg.text}
                </div>
              );
            })
          ) : (
            <div>No messages</div>
          )}
        </div>
        <div className="bg-gray-100">
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              className="p-2 mx-6 mb-2"
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>
        {!socketConnected ? (
          <button className="bg-green-400 text-white px-3 py-2 rounded" onClick={joinRoom}>
            Ask us a question
          </button>
        ) : (
          <button
            className="bg-red-400 text-white px-3 py-2 rounded"
            onClick={() => {
              leaveRoom(socket);
            }}
          >
            Disconnect
          </button>
        )}
      </div>
    </>
  );
}

export default App;
