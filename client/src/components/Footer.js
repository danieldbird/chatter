import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-400 text-white">
      <div className="container mx-auto p-4">
        <p className="text-center text-sm">Copyright {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
