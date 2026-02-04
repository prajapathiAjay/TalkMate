import React from "react";
import Login from "../pages/Login.jsx";
import Chat from "../pages/Chat.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const RoutingSetup = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingSetup;
