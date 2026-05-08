import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Mail,
  Lock,
  LockKeyhole,
  User,
} from "lucide-react";

import Field from "./components/Field";

import {
  Link,
  useNavigate,
} from "react-router-dom";


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Signup = () => {

  const navigate = useNavigate();


  const [formData, setFormData] =
    useState<FormData>({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });


  const [error, setError] =
    useState<string>("");


  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };


  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {

    e.preventDefault();


    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {

      setError(
        "All fields are required"
      );

      return;
    }


    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Password should be same as confirm password"
      );

      return;
    }

  
    if (!formData.role) {

      setError(
        "Please select a role"
      );

      return;
    }

    try {

      const res = await fetch(
        "https://69b17104adac80b427c530f7.mockapi.io/users",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password:
              formData.password,
            role: formData.role,
          }),
        }
      );

 
      if (res.ok) {

        alert(
          "Account created successfully!"
        );

        navigate("/");
      }

    } catch (err) {

      console.error(err);

      setError(
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center space-y-4">

        <h1 className="text-xl sm:text-2xl font-semibold text-center">
          Create Account
        </h1>

        <h2 className="text-gray-600 text-sm sm:text-base text-center">
          Sign up to get started
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full"
        >

          
          <Field
            name="Full Name"
            logo={<User />}
            placeholder="Your name"
            type="text"
            inputName="name"
            onChange={handleChange}
          />


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

          <Field
            name="Confirm Password"
            logo={<LockKeyhole />}
            placeholder="••••••••"
            type="password"
            inputName="confirmPassword"
            onChange={handleChange}
          />

       
          <div className="flex flex-col space-y-2 w-full">

            <h2 className="text-sm sm:text-base font-semibold">
              Role
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">

        
              <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">

                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  className="accent-black"
                />

                Admin

              </label>

        
              <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">

                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={handleChange}
                  className="accent-black"
                />

                User

              </label>

            </div>

          </div>

  
          {error && (

            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

    
          <button className="w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition">

            Create Account

          </button>

   
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 text-sm text-center">

            <p className="text-gray-600">
              Already have an account?
            </p>

            <Link
              to="/"
              className="font-medium hover:underline"
            >
              Sign In
            </Link>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Signup;