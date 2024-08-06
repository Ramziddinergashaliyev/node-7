import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/" element={<Auth />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
