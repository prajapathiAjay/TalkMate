import { useState, useEffect } from "react";
import "./App.css";
import socket from "./Socket.jsx";
import RoutingSetup from "./components/RoutingSetup.jsx";
import { useAuth } from "./contexts/AuthProvider.jsx";

function App() {
  const { userData } = useAuth();

useEffect(() => {
  if (userData && !socket.connected) {
    socket.connect();
  }

  if (!userData && socket.connected) {
    socket.disconnect();
  }
}, [userData]);

  return (
    <RoutingSetup />
  );
}

export default App;
