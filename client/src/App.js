import { useEffect } from "react";

import socketClient from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = socketClient("http://localhost:3001");
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>Home page</h1>
    </>
  );
}

export default App;
