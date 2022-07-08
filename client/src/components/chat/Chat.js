import React from "react";

export default function Chat() {
  return (
    <div className="bg-blue-300 relative p-4 w-[350px] h-[500px] flex flex-col rounded-xl">
      <div className="bg-white h-full overflow-scroll overflow-x-hidden p-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quod voluptate at
        eligendi officiis.
      </div>
      <form className="flex flex-col">
        <input type="text" className="rounded bg-gray-100 p-3" />
      </form>
    </div>
  );
}
