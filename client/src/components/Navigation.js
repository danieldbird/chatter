import React from "react";
import { Link } from "react-router-dom";

import chatter from "./chat.jpg";
// import chatter from "./chatter3.gif";

export default function Navigation() {
  return (
    <nav className="container mx-auto p-4">
      <ul className="flex justify-between text-white items-center">
        <li>
          <Link to="/" className="flex items-center">
            <img src={chatter} alt="" className="w-12 rounded-xl" />
            <h1 className="font-bold text-2xl ml-4">Chatter</h1>
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <p>Admin</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
