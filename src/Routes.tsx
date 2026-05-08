import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  return user ? children : <Navigate to="/" />;
};

const RoutesFile = () => {
  return (
    <div className="flex flex-row justify-center items-center bg-gray-200 py-4 min-h-screen">
      <Routes>
     
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default RoutesFile;