import { useState } from "react";
import { useEffect } from "react";
import socketClient from "socket.io-client";

export default function Admin() {
  const [rooms, setRooms] = useState();
  useEffect(() => {
    const socket = socketClient("http://localhost:3001");
    socket.on("rooms", (rooms) => {
      console.log(rooms);
      setRooms(rooms);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="h-full">
      <div className="bg-gray-100 h-full flex flex-row">
        <ul className="w-[150px] text-center py-4">
          {Array.isArray(rooms) &&
            rooms?.map((room) => {
              return (
                <li
                  key={room.name}
                  className="my-1 bg-blue-200 rounded-md px-3 py-1 cursor-pointer"
                >
                  Room {room.name}
                </li>
              );
            })}
        </ul>
        <div className="bg-gray-50 w-full flex flex-col">
          <div className="mt-auto p-5">This is where the conversation happens</div>
          <input type="text" className="bg-gray-300 p-2" />
        </div>
      </div>
    </div>
  );
}
