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
        <ul className="w-[150px] text-center pt-4 pb-1 flex flex-col">
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
              className="mt-auto mb-1 bg-red-200 rounded-md px-2 py-1 cursor-pointer"
              onClick={leaveRoom}
            >
              Leave Room {roomId.slice(0, 4)}
            </button>
          )}
        </ul>
        <div className="bg-gray-50 w-full flex flex-col">
          <div className="mt-auto px-8 py-6 flex flex-col">
            {messages.length > 0
              ? messages.map((msg, i) => {
                  return (
                    <div
                      key={i}
                      className={`text-white px-8 py-4 w-fit rounded-xl my-1 ${
                        msg.type === "admin"
                          ? "bg-blue-500 text-right self-end"
                          : "bg-gray-500 text-left self-start"
                      }`}
                    >
                      {msg.text}
                    </div>
                  );
                })
              : null}
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
