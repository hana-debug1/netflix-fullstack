import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Browse from "./pages/Browse";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/browse" element={<Browse />} />
    </Routes>
  );
}

export default App;
