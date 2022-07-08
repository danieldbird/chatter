import { useEffect, useState } from "react";

import socketClient from "socket.io-client";
// import Chat from "../components/chat/ChatButton";

function App() {
  const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  // const [room, setRoom] = useState(null);

  function joinRoom() {
    setSocketConnected(true);
    socket.emit("joinRoom");
  }

  function leaveRoom() {
    setSocketConnected(false);
    socket.emit("leaveRoom");
  }

  useEffect(() => {
    const socket = socketClient("http://localhost:3001");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>Home page</h1>
      {/* <Chat /> */}
      {!socketConnected ? (
        <button className="bg-blue-400 text-white px-3 py-2 rounded" onClick={joinRoom}>
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
    </>
  );
}

export default App;
