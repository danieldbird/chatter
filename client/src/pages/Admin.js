import { useState } from "react";
import { useEffect } from "react";
import socketClient from "socket.io-client";

export default function Admin() {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState();
  const [joinedRoom, setJoinedRoom] = useState("");

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

  function joinRoom(room) {
    setJoinedRoom(room);
    socket.emit("adminJoinRoom", room);
  }

  function leaveRoom() {
    setJoinedRoom("");
    socket.emit("leaveRoom");
  }

  // TODO: identify if admin is in a room, so two admins are not talking to each other.

  return (
    <div className="h-full">
      <div className="bg-gray-100 h-full flex flex-row">
        <ul className="w-[150px] text-center py-4">
          {Array.isArray(rooms) &&
            rooms?.map((room) => {
              return room.members < 2 ? (
                <li
                  key={room.name}
                  className="my-1 rounded-md px-3 py-1 cursor-pointer bg-blue-200"
                  onClick={() => {
                    joinRoom(room.name);
                  }}
                >
                  Room {room.name}
                </li>
              ) : (
                <li
                  key={room.name}
                  className="my-1 rounded-md px-3 py-1 cursor-pointer bg-gray-200"
                >
                  Room {room.name}
                </li>
              );
            })}
          {joinedRoom && (
            <button
              className="my-1 bg-red-200 rounded-md px-3 py-1 cursor-pointer"
              onClick={leaveRoom}
            >
              Leave Room {joinedRoom}
            </button>
          )}
        </ul>
        <div className="bg-gray-50 w-full flex flex-col">
          {joinedRoom && <p>Joined Room {joinedRoom}</p>}
          <div className="mt-auto p-5">This is where the conversation happens</div>
          <input type="text" className="bg-gray-300 p-2" />
        </div>
      </div>
    </div>
  );
}
