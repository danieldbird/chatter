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
    setMessages((messages) => [
      ...messages,
      { text: "Hi there, how can I help you today?", type: "admin" },
    ]);
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
          {messages.length > 0
            ? messages.map((msg, i) => {
                return (
                  <span
                    key={i}
                    className={`text-white px-8 py-4 w-fit rounded-xl my-1 ${
                      msg.type === "client"
                        ? "bg-blue-500 text-right self-end"
                        : "bg-gray-500 text-left self-start"
                    }`}
                  >
                    {msg.text}
                  </span>
                );
              })
            : null}
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
        <div className="flex justify-center pt-1">
          {!socketConnected ? (
            <button className="bg-green-400 text-white px-3 py-2 rounded w-1/2" onClick={joinRoom}>
              Ask us a question
            </button>
          ) : (
            <button
              className="bg-red-400 text-white px-3 py-2 rounded w-1/2 text-center"
              onClick={() => {
                leaveRoom(socket);
              }}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
