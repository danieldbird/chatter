import { useState } from "react";
import { useEffect } from "react";
import socketClient from "socket.io-client";

export default function Admin() {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState();
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = socketClient("http://localhost:3001");
    setSocket(socket);
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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

  function joinRoom(room) {
    setRoomId(room);
    socket.emit("adminJoinRoom", room);
  }

  function leaveRoom() {
    setRoomId("");
    socket.emit("leaveRoom");
  }

  // TODO: identify if admin is in a room, so two admins are not talking to each other.

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("sendAdminMessage", message, roomId, () => setMessage(""));
    setMessage("");
  }

  return (
    <div className="h-full">
      <div className="bg-gray-100 h-full flex flex-row">
        <ul className="w-[150px] text-center py-4">
          {Array.isArray(rooms) &&
            rooms?.map((room) => {
              return room.members < 2 ? (
                <li
                  key={room.name}
                  className="my-1 rounded-md px-2 py-1 cursor-pointer bg-blue-200"
                  onClick={() => {
                    joinRoom(room.name);
                  }}
                >
                  Room {room.name.slice(0, 4)}
                </li>
              ) : (
                <li
                  key={room.name}
                  className="my-1 rounded-md px-2 py-1 cursor-pointer bg-gray-200"
                >
                  Room {room.name.slice(0, 4)}
                </li>
              );
            })}
          {roomId && (
            <button
              className="my-1 bg-red-200 rounded-md px-2 py-1 cursor-pointer"
              onClick={leaveRoom}
            >
              Leave Room {roomId.slice(0, 4)}
            </button>
          )}
        </ul>
        <div className="bg-gray-50 w-full flex flex-col">
          <div className="mt-auto px-8 py-6">
            {messages.length > 0 ? (
              messages.map((msg, i) => {
                return (
                  <div
                    key={i}
                    className={msg.type === "client" ? "text-green-500" : "text-blue-500"}
                  >
                    {msg.text}
                  </div>
                );
              })
            ) : (
              <div>No messages</div>
            )}
          </div>
          <div className="bg-gray-100 flex flex-col">
            <form
              className="flex flex-col"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                type="text"
                className="p-2 mb-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
