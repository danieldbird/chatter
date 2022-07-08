import React from "react";

export default function Navigation() {
  return (
    <nav className="container mx-auto p-4">
      <ul className="flex justify-between">
        <li>
          <h1 className="text-white">Chatter</h1>
        </li>
        <li>
          <p>About</p>
        </li>
      </ul>
    </nav>
  );
}
