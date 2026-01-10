import { useState,useEffect } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import Chat from "./pages/Chat.jsx"
import socket from './Socket.jsx'
import Login from './pages/Login.jsx'
import RoutingSetup from './components/RoutingSetup.jsx'
function App() {
  const [count, setCount] = useState(0)


    useEffect(() => {
    socket.connect(); // 🔥 connect ONCE when App mounts
   console.log("ApiUrl",import.meta.env.VITE_API_URL);
    return () => socket.disconnect(); // optional cleanup
  }, []);

  return (
    // <Login/>
  //  <Chat/>
  <RoutingSetup/>
  )
}

export default App
