import React from "react";
import bubble from "./chat.jpg";

export default function ChatButton() {
  return (
    <div>
      <img
        src={bubble}
        alt="Bubble"
        className="w-[50px] absolute bottom-0 right-0 cursor-pointer"
      />
    </div>
  );
}
