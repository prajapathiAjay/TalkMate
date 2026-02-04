import { useState, useEffect } from "react";
import "./App.css";
import socket from "./Socket.jsx";
import RoutingSetup from "./components/RoutingSetup.jsx";
import { useAuth } from "./contexts/AuthProvider.jsx";

function App() {
  const { userData } = useAuth();

  useEffect(() => {
    if(!userData) return
    socket.connect(); 
    return () => socket.disconnect(); // optional cleanup
  }, [userData]);

  return (
    <RoutingSetup />
  );
}

export default App;
