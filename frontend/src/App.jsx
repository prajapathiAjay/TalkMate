import { useState, useEffect } from "react";
import "./App.css";
import socket from "./Socket.jsx";
import RoutingSetup from "./components/RoutingSetup.jsx";
import { useAuth } from "./contexts/AuthProvider.jsx";

function App() {
  console.log("App Rendered");
  const { userData } = useAuth();

useEffect(() => {
  if (userData && !socket.connected) {
    socket.auth = {
  token:localStorage.getItem("token"),
};
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
