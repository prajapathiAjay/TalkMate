import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from "./pages/Chat.jsx"
import socket from './Socket.jsx'
function App() {
  const [count, setCount] = useState(0)


    useEffect(() => {
    socket.connect(); // 🔥 connect ONCE when App mounts

    return () => socket.disconnect(); // optional cleanup
  }, []);
//  socket.connect();
  return (
   <Chat/>
  )
}

export default App
