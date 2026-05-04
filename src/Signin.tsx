import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Field from "./components/Field";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://69b17104adac80b427c530f7.mockapi.io/users"
      );
      const users = await res.json();

      const user = users.find(
        (u) =>
          u.email === loginData.email &&
          u.password === loginData.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      
      {/* CARD */}
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center space-y-4">
        
        <h1 className="text-xl sm:text-2xl font-semibold text-center">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4 w-full">

          <Field
            name="Email Address"
            logo={<Mail />}
            placeholder="you@example.com"
            type="email"
            inputName="email"
            onChange={handleChange}
          />

          <Field
            name="Password"
            logo={<Lock />}
            placeholder="••••••••"
            type="password"
            inputName="password"
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button className="w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition">
            Sign In
          </button>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 text-sm text-center">
            <p>Don't have an account?</p>
            <Link to="/signup" className="hover:underline font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;