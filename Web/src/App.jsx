// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import ExternalCallback from "./ExternalCallback";
import "./Login.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        <Route path="/external-callback" element={<ExternalCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
