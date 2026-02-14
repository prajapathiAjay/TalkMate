// import {io} from "socket.io-client"

//  const socket=io("http://localhost:5000", {
//     autoConnect: true,
//      transports: ["websocket"],  
// })

// export default socket;


import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,          // 🔥 IMPORTANT
  transports: ["websocket"],
  withCredentials: true,       // 🔥 REQUIRED for cookies
});

export default socket;