import { useState, type ChangeEvent, type FormEvent } from "react";

import { Mail, Lock } from "lucide-react";

import Field from "./components/Field";

import {
  Link,
  useNavigate,
} from "react-router-dom";


interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}


interface LoginData {
  email: string;
  password: string;
}

const Signin = () => {

  const navigate = useNavigate();


  const [loginData, setLoginData] =
    useState<LoginData>({
      email: "",
      password: "",
    });


  const [error, setError] =
    useState<string>("");


  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ✅ HANDLE LOGIN
  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {

    e.preventDefault();

    try {

      const res = await fetch(
        "https://69b17104adac80b427c530f7.mockapi.io/users"
      );

      const users: User[] =
        await res.json();

      const user = users.find(
        (u) =>
          u.email === loginData.email &&
          u.password === loginData.password
      );

      if (user) {

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        navigate("/home");

      } else {

        setError(
          "Invalid email or password"
        );
      }

    } catch (err) {

      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">


      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center space-y-4">

        <h1 className="text-xl sm:text-2xl font-semibold text-center">
          Welcome Back
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4 w-full"
        >

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

          {/* ERROR */}
          {error && (

            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button className="w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition">

            Sign In

          </button>


          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 text-sm text-center">

            <p>
              Don't have an account?
            </p>

            <Link
              to="/signup"
              className="hover:underline font-medium"
            >
              Sign Up
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Signin;